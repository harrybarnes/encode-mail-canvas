
import { Search, Bell, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <div className="font-bold text-2xl gradient-text tracking-tight">
            InboxIntel
          </div>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search campaigns, contacts, or emails..."
              className="w-full pl-10 pr-4 py-3 border-0 rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-200 transition-all text-sm placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="relative hover:bg-gray-50 rounded-xl h-10 w-10 p-0">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-medium">
              2
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hover:bg-gray-50 rounded-xl h-10 w-10 p-0">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-100 shadow-lg rounded-xl">
              <DropdownMenuItem className="text-gray-700 hover:bg-gray-50">Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-gray-700 hover:bg-gray-50">Gmail Connection</DropdownMenuItem>
              <DropdownMenuItem className="text-gray-700 hover:bg-gray-50">Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-gray-700 hover:bg-gray-50">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
