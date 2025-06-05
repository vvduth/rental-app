"use client";
import { useCreatePropertyMutation, useGenerateUploadUrlsMutation, useGetAuthUserQuery } from "@/state/api";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropertyFormData, propertySchema } from "@/lib/schemas";
import Header from "@/components/Header";
import { Form } from "@/components/ui/form";
import { PropertyTypeEnum, AmenityEnum, HighlightEnum } from "@/lib/constants";
import { CustomFormField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
const NewPropertyPage = () => {
  const [createProperty] = useCreatePropertyMutation();
  const [generateUploadUrls] = useGenerateUploadUrlsMutation();
  const { data: authUser } = useGetAuthUserQuery();
  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      name: "",
      description: "",
      pricePerMonth: 1000,
      securityDeposit: 500,
      applicationFee: 100,
      isPetsAllowed: true,
      isParkingIncluded: true,
      photoUrls: [],
      amenities: "",
      highlights: "",
      beds: 1,
      baths: 1,
      squareFeet: 1000,
      address: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
  });

 

  const uploadFileToS3 = async (file: File, signedUrl: string): Promise<boolean> => {
    try {
      const response = await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      return false;
    }
  };

   const onSubmit = async (data: PropertyFormData) => {
    if (!authUser?.cognitoInfo?.userId) {
      throw new Error("User not authenticated");
    }
    
    try {
       const files = data.photoUrls as File[];
      
      if (!files || files.length === 0) {
        throw new Error("Please select at least one photo");
      }

      console.log('Files to upload:', files);

      // Step 1: Generate signed URLs
      const fileInfos = files.map(file => ({
        name: file.name,
        type: file.type,
        size: file.size
      }));

      const { uploadUrls } = await generateUploadUrls(fileInfos).unwrap();
      console.log('Generated upload URLs:', uploadUrls);

      // Step 2: Upload files to S3 using signed URLs
      const uploadPromises = files.map(async (file, index) => {
        const uploadInfo = uploadUrls[index];
        const success = await uploadFileToS3(file, uploadInfo.signedUrl);
        
        if (!success) {
          throw new Error(`Failed to upload ${file.name}`);
        }
        
        return uploadInfo.publicUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      console.log('All files uploaded successfully:', uploadedUrls);

      // Step 3: Create property with uploaded photo URLs
      const propertyData = {
        ...data,
        photoUrls: uploadedUrls, // Use the public URLs
        managerCognitoId: authUser.cognitoInfo.userId,
        // Ensure proper data types
        pricePerMonth: Number(data.pricePerMonth),
        securityDeposit: Number(data.securityDeposit),
        applicationFee: Number(data.applicationFee),
        beds: Number(data.beds),
        baths: Number(data.baths),
        squareFeet: Number(data.squareFeet),
        isPetsAllowed: Boolean(data.isPetsAllowed),
        isParkingIncluded: Boolean(data.isParkingIncluded),
      };

      const newProperty = await createProperty(propertyData).unwrap();

      console.log('Property created successfully:', newProperty);
      
      // Reset form or redirect
      form.reset();
      // router.push('/dashboard/managers/properties');
    } catch (error) {
      console.error('Error creating property:', error);
    }
  };
  return (
    <div className="p-5">
      <Header
        title="Create New Property"
        subtitle="Add a new property to your listings"
      />
      <div className="bg-white rounded-xl p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-4 space-y-10"
          >
            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              <div className="space-y-4">
                <CustomFormField name="name" label="Property Name" />
                <CustomFormField
                  name="description"
                  label="Description"
                  type="textarea"
                />
              </div>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Fees */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4">Fees</h2>
              <CustomFormField
                name="pricePerMonth"
                label="Price per Month"
                type="number"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomFormField
                  name="securityDeposit"
                  label="Security Deposit"
                  type="number"
                />
                <CustomFormField
                  name="applicationFee"
                  label="Application Fee"
                  type="number"
                />
              </div>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Property Details */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4">Property Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CustomFormField
                  name="beds"
                  label="Number of Beds"
                  type="number"
                />
                <CustomFormField
                  name="baths"
                  label="Number of Baths"
                  type="number"
                />
                <CustomFormField
                  name="squareFeet"
                  label="Square Feet"
                  type="number"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <CustomFormField
                  name="isPetsAllowed"
                  label="Pets Allowed"
                  type="switch"
                />
                <CustomFormField
                  name="isParkingIncluded"
                  label="Parking Included"
                  type="switch"
                />
              </div>
              <div className="mt-4">
                <CustomFormField
                  name="propertyType"
                  label="Property Type"
                  type="select"
                  options={Object.keys(PropertyTypeEnum).map((type) => ({
                    value: type,
                    label: type,
                  }))}
                />
              </div>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Amenities and Highlights */}
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Amenities and Highlights
              </h2>
              <div className="space-y-6">
                <CustomFormField
                  name="amenities"
                  label="Amenities"
                  type="select"
                  options={Object.keys(AmenityEnum).map((amenity) => ({
                    value: amenity,
                    label: amenity,
                  }))}
                />
                <CustomFormField
                  name="highlights"
                  label="Highlights"
                  type="select"
                  options={Object.keys(HighlightEnum).map((highlight) => ({
                    value: highlight,
                    label: highlight,
                  }))}
                />
              </div>
            </div>

            <hr className="my-6 border-gray-200" />

              {/* Photos */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Photos</h2>
              <CustomFormField
                name="photoUrls"
                label="Property Photos"
                type="file"
                accept="image/*"
              />
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Additional Information */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4">
                Additional Information
              </h2>
              <CustomFormField name="address" label="Address" />
              <div className="flex justify-between gap-4">
                <CustomFormField name="city" label="City" className="w-full" />
                <CustomFormField
                  name="state"
                  label="State"
                  className="w-full"
                />
                <CustomFormField
                  name="postalCode"
                  label="Postal Code"
                  className="w-full"
                />
              </div>
              <CustomFormField name="country" label="Country" />
            </div>

            <Button
              type="submit"
              className="bg-primary-700 text-white w-full mt-8"
            >
              Create Property
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewPropertyPage;
