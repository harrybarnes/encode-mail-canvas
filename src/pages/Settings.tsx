import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Bell, Shield, Database, Trash2 } from "lucide-react";

const Settings = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 w-full">
        <div className="flex w-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  Settings
                </h1>
                <p className="text-gray-600">
                  Manage your account preferences and configuration
                </p>
              </div>

              <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5 max-w-md bg-white/80 backdrop-blur-sm shadow-lg">
                  <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">Profile</TabsTrigger>
                  <TabsTrigger value="email" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">Email</TabsTrigger>
                  <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">Alerts</TabsTrigger>
                  <TabsTrigger value="security" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white">Security</TabsTrigger>
                  <TabsTrigger value="data" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">Data</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-6">
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
                      <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                        <User className="w-5 h-5" />
                        Profile Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            defaultValue="Alex"
                            className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            defaultValue="Johnson"
                            className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue="alex@example.com"
                          className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company
                        </label>
                        <input
                          type="text"
                          defaultValue="InboxIntel Inc."
                          className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                        />
                      </div>
                      <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 border-0">
                        Save Changes
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="email" className="space-y-6">
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
                      <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                        <Mail className="w-5 h-5" />
                        Email Configuration
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            SMTP Server
                          </label>
                          <input
                            type="text"
                            defaultValue="smtp.gmail.com"
                            className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Port
                          </label>
                          <input
                            type="text"
                            defaultValue="587"
                            className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          From Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Alex Johnson"
                          className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Reply-To Email
                        </label>
                        <input
                          type="email"
                          defaultValue="alex@example.com"
                          className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg border border-green-200">
                        <div>
                          <div className="font-medium text-gray-900">Gmail Connected</div>
                          <div className="text-sm text-gray-600">alex@example.com</div>
                        </div>
                        <Button className="border-green-300 text-green-600 hover:bg-green-50">Reconnect</Button>
                      </div>
                      <Button className="bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 border-0">
                        Save Email Settings
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                      <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                        <Bell className="w-5 h-5" />
                        Notification Preferences
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                      {[
                        { label: "Email Replies", description: "Get notified when someone replies to your emails", defaultChecked: true },
                        { label: "Campaign Updates", description: "Receive updates about your campaign performance", defaultChecked: true },
                        { label: "Daily Summary", description: "Get a daily summary of your email activity", defaultChecked: false },
                        { label: "Weekly Reports", description: "Receive weekly performance reports", defaultChecked: true },
                        { label: "System Updates", description: "Get notified about system maintenance and updates", defaultChecked: false },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-purple-200 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                          <div>
                            <div className="font-medium text-gray-900">{item.label}</div>
                            <div className="text-sm text-gray-600">{item.description}</div>
                          </div>
                          <Switch defaultChecked={item.defaultChecked} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
                      <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                        <Shield className="w-5 h-5" />
                        Security Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 p-6">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Change Password</h3>
                        <div className="space-y-3">
                          <input
                            type="password"
                            placeholder="Current password"
                            className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                          />
                          <input
                            type="password"
                            placeholder="New password"
                            className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                          />
                          <input
                            type="password"
                            placeholder="Confirm new password"
                            className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                          />
                        </div>
                        <Button className="mt-3 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 border-0">
                          Update Password
                        </Button>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h3>
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                          <div>
                            <div className="font-medium text-gray-900">Enable 2FA</div>
                            <div className="text-sm text-gray-600">Add an extra layer of security to your account</div>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="data" className="space-y-6">
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-t-lg">
                      <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                        <Database className="w-5 h-5" />
                        Data Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 p-6">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Export Data</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Download all your campaign data, contacts, and email history
                        </p>
                        <Button className="border-teal-300 text-teal-600 hover:bg-teal-50">Export All Data</Button>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="font-medium text-gray-900 mb-2 text-red-600">Danger Zone</h3>
                        <div className="border border-red-200 rounded-lg p-4 bg-gradient-to-r from-red-50 to-pink-50">
                          <div className="flex items-start gap-3">
                            <Trash2 className="w-5 h-5 text-red-600 mt-1" />
                            <div className="flex-1">
                              <h4 className="font-medium text-red-900 mb-1">Delete Account</h4>
                              <p className="text-sm text-red-700 mb-3">
                                Permanently delete your account and all associated data. This action cannot be undone.
                              </p>
                              <Button className="border-red-300 text-red-600 hover:bg-red-100">
                                Delete Account
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
