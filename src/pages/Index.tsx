
import { Header } from "@/components/dashboard/Header";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { CampaignPipeline } from "@/components/dashboard/CampaignPipeline";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { KanbanBoard } from "@/components/dashboard/KanbanBoard";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50/30">
        <Sidebar />
        <SidebarInset className="flex-1">
          <Header />
          
          <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
            {/* Welcome Section */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                Monitor your email campaigns and performance
              </p>
            </div>

            {/* Stats Cards */}
            <StatsCards />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Campaign Pipeline */}
              <div className="lg:col-span-2 space-y-8">
                <CampaignPipeline />
                <KanbanBoard />
              </div>

              {/* Right Column - Activity Timeline */}
              <div className="space-y-8">
                <ActivityTimeline />
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
