"use client";
import ApplicationCard from "@/components/ApplicationCard";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetApplicationsQuery,
  useGetAuthUserQuery,
  useUpdateApplicationStatusMutation,
} from "@/state/api";
import {
  CircleCheckBig,
  Clock,
  Download,
  File,
  Hospital,
  XCircle,
} from "lucide-react";
import { Application } from "@/types/prismaTypes";
import React, { useState } from "react";
import Link from "next/link";

const ApplicationPage = () => {
  const { data: user } = useGetAuthUserQuery();
  const [activetab, setActivetab] = useState("all");
  const {
    data: applications,
    isLoading: isLoadingApplications,
    isError: isErrorApplications,
  } = useGetApplicationsQuery({
    userId: user?.cognitoInfo?.userId,
    userType: "tenant",
  });

  if (isLoadingApplications) {
    return <Loading />;
  }

  if (isErrorApplications || !applications) {
    return <div>Error loading applications</div>;
  }

  return (
    <div className="p-5">
      <Header
        title="Applications"
        subtitle="Track and manage all applications"
      />
      return (
      <div className="dashboard-container">
        <Header
          title="Applications"
          subtitle="Track and manage your property rental applications"
        />
        <div className="w-full">
          {applications?.map((application: Application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              userType="renter"
            >
              <div className="flex justify-between gap-5 w-full pb-4 px-4">
                {application.status === "Approved" ? (
                  <div className="bg-green-100 p-4 text-green-700 grow flex items-center">
                    <CircleCheckBig className="w-5 h-5 mr-2" />
                    The property is being rented by you until{" "}
                    {new Date(application.lease?.endDate).toLocaleDateString()}
                  </div>
                ) : application.status === "Pending" ? (
                  <div className="bg-yellow-100 p-4 text-yellow-700 grow flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Your application is pending approval
                  </div>
                ) : (
                  <div className="bg-red-100 p-4 text-red-700 grow flex items-center">
                    <XCircle className="w-5 h-5 mr-2" />
                    Your application has been denied
                  </div>
                )}

                <button
                  className={`bg-white border border-gray-300 text-gray-700 py-2 px-4
                          rounded-md flex items-center justify-center hover:bg-primary-700 hover:text-primary-50`}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Agreement
                </button>
              </div>
            </ApplicationCard>
          ))}
        </div>
      </div>
      );
    </div>
  );
};

export default ApplicationPage;
