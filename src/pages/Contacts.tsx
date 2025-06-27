
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
        <div className="flex w-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Contacts
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
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
                      className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 focus:border-transparent w-full sm:w-80"
                    />
                  </div>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 focus:border-transparent"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <Button className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Contact
                </Button>
              </div>

              <Card className="border-0 shadow-sm dark:bg-gray-800">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Contact Directory ({filteredContacts.length} contacts)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredContacts.map((contact) => (
                      <Card key={contact.id} className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow dark:bg-gray-800">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{contact.name}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{contact.position}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Badge 
                                variant={contact.status === "Active" ? "default" : contact.status === "Pending" ? "secondary" : "outline"}
                                className="text-xs"
                              >
                                {contact.status}
                              </Badge>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <Building className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
                              {contact.company}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <Mail className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
                              {contact.email}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <Phone className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
                              {contact.phone}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <MapPin className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
                              {contact.location}
                            </div>
                          </div>

                          <div className="mb-4">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Campaigns:</p>
                            <div className="flex flex-wrap gap-1">
                              {contact.campaigns.map((campaign, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {campaign}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Last contact: {contact.lastContact}
                            </p>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
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
