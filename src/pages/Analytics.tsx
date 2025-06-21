
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Mail, Users, Target, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const campaignData = [
  { name: "Week 1", sent: 120, opened: 48, replied: 12 },
  { name: "Week 2", sent: 150, opened: 67, replied: 18 },
  { name: "Week 3", sent: 180, opened: 89, replied: 24 },
  { name: "Week 4", sent: 200, opened: 95, replied: 31 },
];

const responseData = [
  { name: "Mon", responses: 4 },
  { name: "Tue", responses: 7 },
  { name: "Wed", responses: 12 },
  { name: "Thu", responses: 8 },
  { name: "Fri", responses: 15 },
  { name: "Sat", responses: 3 },
  { name: "Sun", responses: 5 },
];

const pieData = [
  { name: "Opened", value: 35, color: "#3b82f6" },
  { name: "Replied", value: 15, color: "#10b981" },
  { name: "Bounced", value: 5, color: "#f59e0b" },
  { name: "Unopened", value: 45, color: "#8b5cf6" },
];

const Analytics = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 w-full">
        <div className="flex w-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-6 space-y-6">
              <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  Analytics Dashboard
                </h1>
                <p className="text-gray-600">
                  Track your campaign performance and engagement metrics
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-blue-100">Total Sent</CardTitle>
                      <Mail className="w-4 h-4 text-blue-200" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold">1,247</div>
                    <p className="text-xs text-blue-200 mt-1">+12% from last month</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-green-100">Open Rate</CardTitle>
                      <TrendingUp className="w-4 h-4 text-green-200" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold">47.5%</div>
                    <p className="text-xs text-green-200 mt-1">+3.2% from last month</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-purple-100">Reply Rate</CardTitle>
                      <Target className="w-4 h-4 text-purple-200" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold">15.2%</div>
                    <p className="text-xs text-purple-200 mt-1">-1.1% from last month</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-orange-100">Avg Response Time</CardTitle>
                      <Clock className="w-4 h-4 text-orange-200" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold">2.4h</div>
                    <p className="text-xs text-orange-200 mt-1">-0.5h from last month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Campaign Performance */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Campaign Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={campaignData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Bar dataKey="sent" fill="#e2e8f0" name="Sent" />
                        <Bar dataKey="opened" fill="#3b82f6" name="Opened" />
                        <Bar dataKey="replied" fill="#10b981" name="Replied" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Response Timeline */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      Daily Responses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={responseData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Line 
                          type="monotone" 
                          dataKey="responses" 
                          stroke="#8b5cf6" 
                          strokeWidth={3}
                          dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Email Status Distribution */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Email Status Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center mt-4 space-x-6">
                      {pieData.map((entry, index) => (
                        <div key={index} className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-sm text-gray-600">{entry.name}: {entry.value}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Performing Campaigns */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      Top Performing Campaigns
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Q4 Product Launch", openRate: "62%", replyRate: "24%", color: "from-blue-500 to-purple-500" },
                        { name: "Holiday Outreach", openRate: "58%", replyRate: "19%", color: "from-green-500 to-blue-500" },
                        { name: "Partnership Proposal", openRate: "51%", replyRate: "16%", color: "from-purple-500 to-pink-500" },
                        { name: "Follow-up Series", openRate: "45%", replyRate: "12%", color: "from-orange-500 to-red-500" },
                      ].map((campaign, index) => (
                        <div key={index} className={`flex items-center justify-between p-3 bg-gradient-to-r ${campaign.color} text-white rounded-lg shadow-md`}>
                          <div>
                            <div className="font-medium">{campaign.name}</div>
                            <div className="text-sm opacity-90">
                              Open: {campaign.openRate} • Reply: {campaign.replyRate}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;
