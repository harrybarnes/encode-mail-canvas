
import { Target, Clock, Send, MessageSquare, CheckCircle } from "lucide-react";

const campaigns = [
  {
    id: 1,
    name: "Product Demo Outreach",
    stage: "active",
    sent: 45,
    replies: 8,
    status: "In Progress",
    goal: "Get 10 product demos",
    progress: 80,
  },
  {
    id: 2,
    name: "Partnership Proposals",
    stage: "draft",
    sent: 0,
    replies: 0,
    status: "Draft",
    goal: "Secure 3 partnerships",
    progress: 20,
  },
  {
    id: 3,
    name: "Investor Outreach",
    stage: "paused",
    sent: 120,
    replies: 15,
    status: "Paused",
    goal: "Connect with 20 investors",
    progress: 60,
  },
  {
    id: 4,
    name: "Customer Success",
    stage: "completed",
    sent: 200,
    replies: 45,
    status: "Completed",
    goal: "Improve retention by 15%",
    progress: 100,
  },
];

const getStageIcon = (stage: string) => {
  switch (stage) {
    case "draft": return Clock;
    case "active": return Send;
    case "paused": return MessageSquare;
    case "completed": return CheckCircle;
    default: return Target;
  }
};

const getStageColor = (stage: string) => {
  switch (stage) {
    case "draft": return "bg-gray-100 text-gray-600";
    case "active": return "bg-blue-100 text-blue-600";
    case "paused": return "bg-yellow-100 text-yellow-600";
    case "completed": return "bg-green-100 text-green-600";
    default: return "bg-gray-100 text-gray-600";
  }
};

export function CampaignPipeline() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Campaign Pipeline</h2>
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all">
          New Campaign
        </button>
      </div>

      <div className="space-y-4">
        {campaigns.map((campaign) => {
          const StageIcon = getStageIcon(campaign.stage);
          return (
            <div
              key={campaign.id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getStageColor(campaign.stage)}`}>
                    <StageIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                    <p className="text-sm text-gray-600">{campaign.goal}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStageColor(campaign.stage)}`}>
                  {campaign.status}
                </span>
              </div>

              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>📤 {campaign.sent} sent</span>
                  <span>💬 {campaign.replies} replies</span>
                  <span>📊 {campaign.replies > 0 ? ((campaign.replies / campaign.sent) * 100).toFixed(1) : '0'}% reply rate</span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${campaign.progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
