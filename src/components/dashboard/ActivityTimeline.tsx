
const activities = [
  {
    id: 1,
    user: "System",
    action: "received reply from",
    target: "sarah@techstartup.com",
    time: "2 minutes ago",
    avatar: "📧",
    type: "reply",
    campaign: "Product Demo Outreach"
  },
  {
    id: 2,
    user: "You",
    action: "sent email to",
    target: "john@enterprise.com",
    time: "15 minutes ago",
    avatar: "📤",
    type: "sent",
    campaign: "Partnership Proposals"
  },
  {
    id: 3,
    user: "AI Assistant",
    action: "optimized email for",
    target: "Investor Outreach Campaign",
    time: "1 hour ago",
    avatar: "🤖",
    type: "optimization",
  },
  {
    id: 4,
    user: "You",
    action: "created new campaign",
    target: "Customer Success Follow-up",
    time: "3 hours ago",
    avatar: "🎯",
    type: "campaign",
  },
  {
    id: 5,
    user: "System",
    action: "Gmail connected successfully",
    target: "OAuth authentication complete",
    time: "1 day ago",
    avatar: "🔗",
    type: "system",
  },
];

export function ActivityTimeline() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-fit">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex items-start gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-lg flex-shrink-0">
              {activity.avatar}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-900">{activity.user}</span>
                <span className="text-gray-600">{activity.action}</span>
              </div>
              
              <p className="text-sm text-gray-600 mb-1">{activity.target}</p>
              {activity.campaign && (
                <p className="text-xs text-blue-600 mb-1">📋 {activity.campaign}</p>
              )}
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
            
            <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-2 ${
              activity.type === "reply" ? "bg-green-500" :
              activity.type === "sent" ? "bg-blue-500" :
              activity.type === "optimization" ? "bg-purple-500" :
              activity.type === "campaign" ? "bg-orange-500" :
              "bg-gray-500"
            }`} />
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 text-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
        View all activity
      </button>
    </div>
  );
}
