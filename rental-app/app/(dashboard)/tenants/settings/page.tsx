"use client";
import SettingsForm from "@/components/SettingsForm";
import { useGetAuthUserQuery, useUpdateTenantSettingsMutation } from "@/state/api";
import React from "react";

const TentantSettingsPage = () => {
  const { data: authUser, isLoading } = useGetAuthUserQuery();
  
  const [updateTenant] = useUpdateTenantSettingsMutation();
  
  if (isLoading) return <div>Loading...</div>;
  
  const initialData = {
    name: authUser?.userInfo.name || "",
    email: authUser?.userInfo.email || "",
    phoneNumber: authUser?.userInfo.phoneNumber || "",
  };

  const handleSubmit = async (data: typeof initialData) => {
    await updateTenant({
      cognitoId: authUser?.cognitoInfo?.userId,
      ...data,
    })
  }
  return (
    <SettingsForm 
      initialData={initialData}
      onSubmit={handleSubmit}
      userType="tenant"
    />
  );
};

export default TentantSettingsPage;
