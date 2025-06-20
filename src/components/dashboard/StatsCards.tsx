
import { User, Bell, Calendar, Search } from "lucide-react";

const stats = [
  {
    title: "Total Contacts",
    value: "2,847",
    change: "+12%",
    icon: User,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    title: "Active Deals",
    value: "47",
    change: "+8%",
    icon: Bell,
    gradient: "from-purple-500 to-purple-600",
  },
  {
    title: "Tasks Due Today",
    value: "12",
    change: "-2%",
    icon: Calendar,
    gradient: "from-green-500 to-green-600",
  },
  {
    title: "Monthly Revenue",
    value: "$84,200",
    change: "+24%",
    icon: Search,
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
            <span
              className={`text-sm font-medium px-2 py-1 rounded-full ${
                stat.change.startsWith("+")
                  ? "text-green-700 bg-green-100"
                  : "text-red-700 bg-red-100"
              }`}
            >
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
