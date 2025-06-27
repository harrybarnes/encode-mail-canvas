
import { Target, Send, Mail, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Active Campaigns",
    value: "12",
    change: "+3",
    icon: Target,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    title: "Emails Sent",
    value: "2,847",
    change: "+156",
    icon: Send,
    gradient: "from-purple-500 to-purple-600",
  },
  {
    title: "Replies Received",
    value: "127",
    change: "+18",
    icon: Mail,
    gradient: "from-green-500 to-green-600",
  },
  {
    title: "Reply Rate",
    value: "4.5%",
    change: "+0.8%",
    icon: TrendingUp,
    gradient: "from-orange-500 to-orange-600",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.gradient} shadow-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium px-2 py-1 rounded-full text-green-700 bg-green-100">
              {stat.change}
            </span>
          </div>
          
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
