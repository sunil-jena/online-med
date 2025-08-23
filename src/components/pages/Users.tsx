import React from "react";
import { Breadcrumb } from "@/components/layout/components/Breadcrumb";
import Layout from "@/components/layout/Layout";

const Users = () => {
  return (
    <Layout>
      <div className=" p-6">
        <div className="mb-6">
          <Breadcrumb items={[{ label: "User Profiles" }]} />
          <div className="mt-4">
            <h1 className="text-2xl font-semibold text-foreground">User Profiles</h1>
            <p className="text-muted-foreground mt-1">
              Manage user accounts and profile information
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <h2 className="text-lg font-medium text-foreground mb-2">Coming Soon</h2>
          <p className="text-muted-foreground">User management features will be available here.</p>
        </div>
      </div>
    </Layout>
  );
}

export default Users