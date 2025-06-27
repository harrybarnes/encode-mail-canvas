
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { CampaignPipeline } from "@/components/dashboard/CampaignPipeline";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-slate-50 w-full">
        <div className="flex w-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-6 space-y-6">
              {/* Welcome Section */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome back, Alex 👋
                </h1>
                <p className="text-gray-600">
                  Track your cold email campaigns and optimize your outreach strategy
                </p>
              </div>

              {/* Stats Cards */}
              <StatsCards />

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Campaign Pipeline */}
                <div className="xl:col-span-2">
                  <CampaignPipeline />
                </div>

                {/* Activity Timeline */}
                <div className="xl:col-span-1">
                  <ActivityTimeline />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
