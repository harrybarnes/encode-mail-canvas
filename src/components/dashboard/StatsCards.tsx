
import { Target, Send, Mail, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Active Campaigns",
    value: "12",
    change: "+3",
    icon: Target,
    trend: "up",
  },
  {
    title: "Emails Sent",
    value: "2,847",
    change: "+156",
    icon: Send,
    trend: "up",
  },
  {
    title: "Replies Received",
    value: "127",
    change: "+18",
    icon: Mail,
    trend: "up",
  },
  {
    title: "Reply Rate",
    value: "4.5%",
    change: "+0.8%",
    icon: TrendingUp,
    trend: "up",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="glass-card rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 rounded-xl bg-gray-900 shadow-lg">
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold px-3 py-1 rounded-full text-gray-700 bg-gray-100/80">
              {stat.change}
            </span>
          </div>
          
          <div>
            <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
            <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
