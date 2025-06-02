"use client";
import SettingsForm from "@/components/SettingsForm";
import { useGetAuthUserQuery, useUpdateManagerSettingsMutation } from "@/state/api";
import React from "react";

const ManagerSettingsPage = () => {
  const { data: authUser, isLoading } = useGetAuthUserQuery();
  
  const [updateManager] = useUpdateManagerSettingsMutation();
  
  if (isLoading) return <div>Loading...</div>;
  
  const initialData = {
    name: authUser?.userInfo.name || "",
    email: authUser?.userInfo.email || "",
    phoneNumber: authUser?.userInfo.phoneNumber || "",
  };

  const handleSubmit = async (data: typeof initialData) => {
    await updateManager({
      cognitoId: authUser?.cognitoInfo?.userId,
      ...data,
    })
  }
  return (
    <SettingsForm 
      initialData={initialData}
      onSubmit={handleSubmit}
      userType="manager"
    />
  );
};

export default ManagerSettingsPage;
