
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Plus, Search, Filter, MoreHorizontal, Mail, Phone, Building, Calendar } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { NewContactForm } from "@/components/forms/NewContactForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Contact {
  id: number;
  name: string;
  email: string;
  company: string;
  title: string;
  status: string;
  lastContact: string;
  campaigns: number;
  replies: number;
  tags: string[];
}

const initialContacts: Contact[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@techstartup.com",
    company: "TechStartup Inc",
    title: "VP of Engineering",
    status: "engaged",
    lastContact: "2024-01-20",
    campaigns: 2,
    replies: 3,
    tags: ["high-priority", "warm-lead"],
  },
  {
    id: 2,
    name: "John Smith",
    email: "john@enterprise.com",
    company: "Enterprise Corp",
    title: "CTO",
    status: "cold",
    lastContact: "2024-01-18",
    campaigns: 1,
    replies: 0,
    tags: ["tech-leader"],
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily@startup.io",
    company: "Startup.io",
    title: "Founder",
    status: "replied",
    lastContact: "2024-01-22",
    campaigns: 3,
    replies: 5,
    tags: ["decision-maker", "hot-lead"],
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "engaged": return "bg-blue-100 text-blue-700";
    case "replied": return "bg-green-100 text-green-700";
    case "cold": return "bg-gray-100 text-gray-700";
    case "bounced": return "bg-red-100 text-red-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const navigate = useNavigate();

  const handleCreateContact = (contactData: { name: string; email: string; company: string; title: string }) => {
    const newContact: Contact = {
      id: Math.max(...contacts.map(c => c.id)) + 1,
      name: contactData.name,
      email: contactData.email,
      company: contactData.company,
      title: contactData.title,
      status: "cold",
      lastContact: new Date().toISOString().split('T')[0],
      campaigns: 0,
      replies: 0,
      tags: [],
    };

    setContacts([newContact, ...contacts]);
    setIsDialogOpen(false);
  };

  const filteredContacts = contacts
    .filter(contact => {
      const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || contact.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name": return a.name.localeCompare(b.name);
        case "company": return a.company.localeCompare(b.company);
        case "replies": return b.replies - a.replies;
        case "recent":
        default: return new Date(b.lastContact).getTime() - new Date(a.lastContact).getTime();
      }
    });

  const stats = {
    total: contacts.length,
    engaged: contacts.filter(c => c.status === "engaged").length,
    replied: contacts.filter(c => c.status === "replied").length,
    cold: contacts.filter(c => c.status === "cold").length,
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 w-full">
        <div className="flex w-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-8 space-y-8">
              {/* Page Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-3">Contacts</h1>
                  <p className="text-gray-600 text-lg">
                    Manage your contact database and track engagement
                  </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg">
                      <Plus className="w-4 h-4 mr-2" />
                      New Contact
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <NewContactForm
                      onSubmit={handleCreateContact}
                      onCancel={() => setIsDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="glass-card rounded-2xl border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-gray-900">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                        <p className="text-gray-600 text-sm font-medium">Total Contacts</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="glass-card rounded-2xl border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-blue-600">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-gray-900">{stats.engaged}</p>
                        <p className="text-gray-600 text-sm font-medium">Engaged</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="glass-card rounded-2xl border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-green-600">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-gray-900">{stats.replied}</p>
                        <p className="text-gray-600 text-sm font-medium">Replied</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="glass-card rounded-2xl border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-gray-500">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-gray-900">{stats.cold}</p>
                        <p className="text-gray-600 text-sm font-medium">Cold Leads</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contacts Management */}
              <Card className="glass-card rounded-2xl border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">All Contacts</CardTitle>
                      <CardDescription className="text-gray-600">
                        Search, filter, and manage your contacts
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        onClick={() => setViewMode("grid")}
                        className={viewMode === "grid" ? "bg-gray-900 text-white" : ""}
                      >
                        Grid
                      </Button>
                      <Button
                        variant={viewMode === "table" ? "default" : "outline"}
                        onClick={() => setViewMode("table")}
                        className={viewMode === "table" ? "bg-gray-900 text-white" : ""}
                      >
                        Table
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search contacts..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-12 rounded-xl border-gray-200 focus:ring-black/10 h-12"
                        />
                      </div>
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-[180px] rounded-xl border-gray-200 h-12">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-sm border border-gray-200/50">
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="engaged">Engaged</SelectItem>
                        <SelectItem value="replied">Replied</SelectItem>
                        <SelectItem value="cold">Cold</SelectItem>
                        <SelectItem value="bounced">Bounced</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full sm:w-[180px] rounded-xl border-gray-200 h-12">
                        <Calendar className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-sm border border-gray-200/50">
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="name">Name A-Z</SelectItem>
                        <SelectItem value="company">Company A-Z</SelectItem>
                        <SelectItem value="replies">Most Replies</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Contacts Display */}
                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredContacts.map((contact) => (
                        <Card
                          key={contact.id}
                          className="glass-card rounded-2xl border-0 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                        >
                          <CardHeader className="pb-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                                {contact.name.charAt(0)}
                              </div>
                              <Badge className={`${getStatusColor(contact.status)} rounded-lg font-medium capitalize`}>
                                {contact.status}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg font-bold group-hover:text-gray-700 transition-colors">
                              {contact.name}
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-600">
                              {contact.title} at {contact.company}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="text-sm text-gray-600">
                                📧 {contact.email}
                              </div>
                              
                              <div className="flex justify-between text-sm text-gray-600 font-medium">
                                <span>📤 {contact.campaigns} campaigns</span>
                                <span>💬 {contact.replies} replies</span>
                              </div>
                              
                              <div className="flex flex-wrap gap-1">
                                {contact.tags.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs rounded-md">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              
                              <div className="text-xs text-gray-500 font-medium">
                                Last contact: {new Date(contact.lastContact).toLocaleDateString()}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-semibold">Contact</TableHead>
                            <TableHead className="font-semibold">Company</TableHead>
                            <TableHead className="font-semibold">Status</TableHead>
                            <TableHead className="font-semibold">Campaigns</TableHead>
                            <TableHead className="font-semibold">Replies</TableHead>
                            <TableHead className="font-semibold">Last Contact</TableHead>
                            <TableHead className="font-semibold">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredContacts.map((contact) => (
                            <TableRow key={contact.id} className="hover:bg-gray-50/80">
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                    {contact.name.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="font-semibold text-gray-900">{contact.name}</div>
                                    <div className="text-sm text-gray-600">{contact.email}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-medium text-gray-900">{contact.company}</div>
                                  <div className="text-sm text-gray-600">{contact.title}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={`${getStatusColor(contact.status)} rounded-lg font-medium capitalize`}>
                                  {contact.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-medium">{contact.campaigns}</TableCell>
                              <TableCell className="font-medium">{contact.replies}</TableCell>
                              <TableCell className="text-sm text-gray-600">
                                {new Date(contact.lastContact).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="rounded-lg">
                                      <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent className="bg-white/95 backdrop-blur-sm border border-gray-200/50">
                                    <DropdownMenuItem className="hover:bg-gray-100/80">View Details</DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-gray-100/80">Edit Contact</DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-gray-100/80">Add to Campaign</DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-gray-100/80 text-red-600">Delete</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}

                  {/* Empty state */}
                  {filteredContacts.length === 0 && (
                    <div className="text-center py-16">
                      <Users className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                      <h3 className="text-xl font-bold text-gray-900 mb-3">No contacts found</h3>
                      <p className="text-gray-600 mb-6 text-lg">
                        {searchTerm || statusFilter !== "all" 
                          ? "Try adjusting your search or filter criteria"
                          : "Add your first contact to get started"
                        }
                      </p>
                      {!searchTerm && statusFilter === "all" && (
                        <Button 
                          onClick={() => setIsDialogOpen(true)}
                          className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Contact
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
