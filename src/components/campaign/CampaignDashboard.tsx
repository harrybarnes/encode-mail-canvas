
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Mail, Reply, TrendingUp, Play, Pause } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  title: string;
}

interface CampaignDashboardProps {
  campaign: any;
  leads: Lead[];
}

// Mock data for demonstration
const mockActivityData = [
  { date: "2024-01-15", sent: 25, replies: 2 },
  { date: "2024-01-16", sent: 30, replies: 3 },
  { date: "2024-01-17", sent: 28, replies: 1 },
  { date: "2024-01-18", sent: 35, replies: 4 },
  { date: "2024-01-19", sent: 32, replies: 2 },
  { date: "2024-01-20", sent: 29, replies: 3 },
  { date: "2024-01-21", sent: 31, replies: 5 },
];

const mockActivityLog = [
  {
    id: 1,
    type: "sent",
    message: "Email sent to John Doe at TechCorp",
    timestamp: "2024-01-21 14:30:00",
    recipient: "john.doe@techcorp.com"
  },
  {
    id: 2,
    type: "reply",
    message: "Reply received from Sarah Johnson at StartupXYZ",
    timestamp: "2024-01-21 13:45:00",
    recipient: "sarah.johnson@startupxyz.com"
  },
  {
    id: 3,
    type: "campaign",
    message: "Campaign paused by user",
    timestamp: "2024-01-21 13:00:00",
    recipient: "Campaign management"
  },
  {
    id: 4,
    type: "campaign",
    message: "Campaign resumed and is now active",
    timestamp: "2024-01-21 12:30:00",
    recipient: "Campaign management"
  },
  {
    id: 5,
    type: "sent",
    message: "Email sent to Mike Chen at InnovateLabs",
    timestamp: "2024-01-21 12:15:00",
    recipient: "mike.chen@innovatelabs.com"
  },
  {
    id: 6,
    type: "reply",
    message: "Reply received from Lisa Park at GrowthCo",
    timestamp: "2024-01-21 11:30:00",
    recipient: "lisa.park@growthco.com"
  },
  {
    id: 7,
    type: "campaign",
    message: "Campaign launched successfully",
    timestamp: "2024-01-21 10:00:00",
    recipient: "Campaign management"
  },
  {
    id: 8,
    type: "sent",
    message: "Email sent to David Wilson at ScaleTech",
    timestamp: "2024-01-21 10:45:00",
    recipient: "david.wilson@scaletech.com"
  },
];

const chartConfig = {
  sent: {
    label: "Emails Sent",
    color: "#3b82f6",
  },
  replies: {
    label: "Replies",
    color: "#10b981",
  },
};

// Custom animated line component
const AnimatedLine = ({ dataKey, stroke, ...props }: any) => {
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(1);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Line
      {...props}
      dataKey={dataKey}
      stroke={stroke}
      strokeWidth={3}
      dot={{ fill: stroke, strokeWidth: 2, r: 6 }}
      activeDot={{ r: 8 }}
      strokeDasharray={`${animationProgress * 1000} 1000`}
      style={{
        animation: `drawLine 2s ease-out forwards`,
      }}
    />
  );
};

export function CampaignDashboard({ campaign, leads }: CampaignDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");

  const dailyEmailsTarget = Math.ceil(leads.length / 7); // Spread over 7 days
  const totalDays = 7;

  return (
    <div className="space-y-6">
      {/* Campaign Plan Summary */}
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle>Campaign Execution Plan</CardTitle>
              <CardDescription>
                {campaign.stage === "active" ? "Your campaign is now live and running according to schedule" : "Your campaign is paused - resume to continue sending emails"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg transition-all hover:scale-105">
              <div className="text-2xl font-bold text-blue-600 mb-1">{leads.length}</div>
              <div className="text-sm text-blue-700">Total Contacts</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg transition-all hover:scale-105">
              <div className="text-2xl font-bold text-green-600 mb-1">{dailyEmailsTarget}</div>
              <div className="text-sm text-green-700">Emails per Day</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg transition-all hover:scale-105">
              <div className="text-2xl font-bold text-purple-600 mb-1">{totalDays}</div>
              <div className="text-sm text-purple-700">Campaign Duration</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Chart - Full Width */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
          <CardDescription>
            Daily emails sent and replies received over time
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[400px] w-full">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockActivityData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <AnimatedLine 
                    type="monotone" 
                    dataKey="sent" 
                    stroke={chartConfig.sent.color}
                  />
                  <AnimatedLine 
                    type="monotone" 
                    dataKey="replies" 
                    stroke={chartConfig.replies.color}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Activity Log */}
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600">
              <CalendarDays className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest emails sent, replies received, and campaign actions
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockActivityLog.map((activity, index) => (
              <div 
                key={activity.id} 
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg transition-all hover:bg-gray-100 hover:scale-[1.02] animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0">
                  {activity.type === "sent" ? (
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                  ) : activity.type === "reply" ? (
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Reply className="w-4 h-4 text-green-600" />
                    </div>
                  ) : (
                    <div className="p-2 bg-orange-100 rounded-lg">
                      {activity.message.includes("paused") ? (
                        <Pause className="w-4 h-4 text-orange-600" />
                      ) : (
                        <Play className="w-4 h-4 text-orange-600" />
                      )}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.message}</p>
                  <p className="text-sm text-gray-600">{activity.recipient}</p>
                </div>
                <div className="flex-shrink-0">
                  <Badge variant={
                    activity.type === "sent" ? "secondary" : 
                    activity.type === "reply" ? "default" : 
                    "outline"
                  }>
                    {activity.type === "sent" ? "Sent" : 
                     activity.type === "reply" ? "Reply" : 
                     "Campaign"}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <style>{`
        @keyframes drawLine {
          from {
            stroke-dasharray: 0 1000;
          }
          to {
            stroke-dasharray: 1000 1000;
          }
        }
      `}</style>
    </div>
  );
}
