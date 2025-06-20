
const activities = [
  {
    id: 1,
    user: "Alex Johnson",
    action: "contacted",
    target: "Acme Corp",
    time: "2 hours ago",
    avatar: "AJ",
    type: "contact",
  },
  {
    id: 2,
    user: "Sarah Wilson",
    action: "closed deal",
    target: "Tech Solutions - $25,000",
    time: "4 hours ago",
    avatar: "SW",
    type: "deal",
  },
  {
    id: 3,
    user: "Mike Davis",
    action: "sent proposal",
    target: "Global Industries",
    time: "6 hours ago",
    avatar: "MD",
    type: "proposal",
  },
  {
    id: 4,
    user: "Lisa Chen",
    action: "scheduled call",
    target: "StartupX",
    time: "8 hours ago",
    avatar: "LC",
    type: "calendar",
  },
  {
    id: 5,
    user: "Tom Brown",
    action: "updated contact",
    target: "Enterprise LLC",
    time: "1 day ago",
    avatar: "TB",
    type: "contact",
  },
];

export function ActivityTimeline() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-fit">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex items-start gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
              {activity.avatar}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-900">{activity.user}</span>
                <span className="text-gray-600">{activity.action}</span>
              </div>
              
              <p className="text-sm text-gray-600 mb-1">{activity.target}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
            
            <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-2 ${
              activity.type === "deal" ? "bg-green-500" :
              activity.type === "contact" ? "bg-blue-500" :
              activity.type === "proposal" ? "bg-yellow-500" :
              "bg-purple-500"
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
