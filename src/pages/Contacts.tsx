
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Mail, Phone, Building, MapPin, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

const contacts = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp Inc.",
    position: "VP of Engineering",
    location: "San Francisco, CA",
    status: "Active",
    lastContact: "2 days ago",
    campaigns: ["Q4 Outreach", "Product Launch"]
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    phone: "+1 (555) 987-6543",
    company: "InnovateCo",
    position: "Product Manager",
    location: "New York, NY",
    status: "Pending",
    lastContact: "1 week ago",
    campaigns: ["Enterprise Sales"]
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike.chen@startup.io",
    phone: "+1 (555) 456-7890",
    company: "StartupXYZ",
    position: "Founder & CEO",
    location: "Austin, TX",
    status: "Active",
    lastContact: "3 days ago",
    campaigns: ["Investor Outreach", "Partnership"]
  },
  {
    id: 4,
    name: "Lisa Garcia",
    email: "lisa.garcia@enterprise.com",
    phone: "+1 (555) 321-9876",
    company: "Enterprise Solutions",
    position: "Director of Sales",
    location: "Chicago, IL",
    status: "Inactive",
    lastContact: "2 weeks ago",
    campaigns: ["Enterprise Sales"]
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@agency.com",
    phone: "+1 (555) 654-3210",
    company: "Creative Agency",
    position: "Creative Director",
    location: "Los Angeles, CA",
    status: "Active",
    lastContact: "5 days ago",
    campaigns: ["Partnership", "Q4 Outreach"]
  }
];

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || contact.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 w-full">
        <div className="flex w-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Contacts
                </h1>
                <p className="text-gray-600">
                  Manage your contact database and outreach targets
                </p>
              </div>

              <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search contacts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-cyan-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent w-full sm:w-80"
                    />
                  </div>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-2 border border-cyan-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600 border-0">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Contact
                </Button>
              </div>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-t-lg">
                  <CardTitle className="text-lg font-semibold">
                    Contact Directory ({filteredContacts.length} contacts)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredContacts.map((contact) => (
                      <Card key={contact.id} className="border-0 shadow-md hover:shadow-lg transition-all bg-gradient-to-br from-white to-cyan-50">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">{contact.name}</h3>
                              <p className="text-sm text-gray-600">{contact.position}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Badge 
                                className={`text-xs border-0 ${
                                  contact.status === "Active" 
                                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white" 
                                    : contact.status === "Pending" 
                                    ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white" 
                                    : "bg-gradient-to-r from-gray-400 to-gray-500 text-white"
                                }`}
                              >
                                {contact.status}
                              </Badge>
                              <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-cyan-100">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <Building className="w-4 h-4 mr-2 text-cyan-500" />
                              {contact.company}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Mail className="w-4 h-4 mr-2 text-blue-500" />
                              {contact.email}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="w-4 h-4 mr-2 text-green-500" />
                              {contact.phone}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                              {contact.location}
                            </div>
                          </div>

                          <div className="mb-4">
                            <p className="text-xs text-gray-500 mb-2">Campaigns:</p>
                            <div className="flex flex-wrap gap-1">
                              {contact.campaigns.map((campaign, index) => (
                                <Badge key={index} className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                                  {campaign}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500">
                              Last contact: {contact.lastContact}
                            </p>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Contacts;
