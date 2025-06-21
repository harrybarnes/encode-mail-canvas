
import { useState } from "react";
import { Users, Mail, Phone, Building, Plus, Filter, Search, Calendar, User, MapPin } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { NewContactForm } from "@/components/forms/NewContactForm";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  location?: string;
  status: string;
  tags: string[];
  lastContact: string;
  source: string;
  avatar?: string;
}

const initialContacts: Contact[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp",
    position: "VP of Marketing",
    location: "San Francisco, CA",
    status: "hot",
    tags: ["prospect", "enterprise"],
    lastContact: "2024-01-20",
    source: "LinkedIn",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@innovate.io",
    phone: "+1 (555) 987-6543",
    company: "Innovate.io",
    position: "CEO",
    location: "New York, NY",
    status: "warm",
    tags: ["decision-maker", "startup"],
    lastContact: "2024-01-18",
    source: "Referral",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@globalfirm.com",
    company: "Global Firm",
    position: "Operations Director",
    location: "Austin, TX",
    status: "cold",
    tags: ["prospect"],
    lastContact: "2024-01-15",
    source: "Website",
  },
  {
    id: 4,
    name: "David Kim",
    email: "david@startupventure.com",
    phone: "+1 (555) 456-7890",
    company: "Startup Venture",
    position: "Founder",
    location: "Seattle, WA",
    status: "converted",
    tags: ["customer", "startup"],
    lastContact: "2024-01-22",
    source: "Cold Email",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "hot": return "bg-red-50 text-red-600 border-red-200";
    case "warm": return "bg-orange-50 text-orange-600 border-orange-200";
    case "cold": return "bg-blue-50 text-blue-600 border-blue-200";
    case "converted": return "bg-green-50 text-green-600 border-green-200";
    default: return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

const getTagColor = (tag: string) => {
  switch (tag) {
    case "prospect": return "bg-purple-50 text-purple-600 border-purple-200";
    case "customer": return "bg-green-50 text-green-600 border-green-200";
    case "enterprise": return "bg-blue-50 text-blue-600 border-blue-200";
    case "startup": return "bg-orange-50 text-orange-600 border-orange-200";
    case "decision-maker": return "bg-red-50 text-red-600 border-red-200";
    default: return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateContact = (contactData: { 
    name: string; 
    email: string; 
    company?: string; 
    position?: string; 
    phone?: string; 
  }) => {
    const newContact: Contact = {
      id: Math.max(...contacts.map(c => c.id)) + 1,
      name: contactData.name,
      email: contactData.email,
      phone: contactData.phone,
      company: contactData.company,
      position: contactData.position,
      status: "cold",
      tags: ["prospect"],
      lastContact: new Date().toISOString().split('T')[0],
      source: "Manual",
    };

    setContacts([newContact, ...contacts]);
    setIsDialogOpen(false);
  };

  const filteredContacts = contacts
    .filter(contact => {
      const matchesSearch = 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.position?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || contact.status === statusFilter;
      const matchesSource = sourceFilter === "all" || contact.source === sourceFilter;
      
      return matchesSearch && matchesStatus && matchesSource;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name": return a.name.localeCompare(b.name);
        case "company": return (a.company || "").localeCompare(b.company || "");
        case "status": return a.status.localeCompare(b.status);
        case "recent":
        default: return new Date(b.lastContact).getTime() - new Date(a.lastContact).getTime();
      }
    });

  const stats = {
    total: contacts.length,
    hot: contacts.filter(c => c.status === "hot").length,
    warm: contacts.filter(c => c.status === "warm").length,
    converted: contacts.filter(c => c.status === "converted").length,
  };

  const sources = [...new Set(contacts.map(c => c.source))];

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-slate-50 w-full">
        <div className="flex w-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-6 space-y-6">
              {/* Page Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Contacts</h1>
                  <p className="text-gray-600">
                    Manage your prospects, leads, and customers
                  </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Contact
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
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        <p className="text-gray-600 text-sm">Total Contacts</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{stats.hot}</p>
                        <p className="text-gray-600 text-sm">Hot Leads</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{stats.warm}</p>
                        <p className="text-gray-600 text-sm">Warm Leads</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{stats.converted}</p>
                        <p className="text-gray-600 text-sm">Converted</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Filters and Search */}
              <Card>
                <CardHeader>
                  <CardTitle>All Contacts</CardTitle>
                  <CardDescription>
                    Search, filter, and manage your contact database
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search contacts..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="hot">Hot</SelectItem>
                        <SelectItem value="warm">Warm</SelectItem>
                        <SelectItem value="cold">Cold</SelectItem>
                        <SelectItem value="converted">Converted</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sourceFilter} onValueChange={setSourceFilter}>
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sources</SelectItem>
                        {sources.map(source => (
                          <SelectItem key={source} value={source}>{source}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <Calendar className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Recent</SelectItem>
                        <SelectItem value="name">Name A-Z</SelectItem>
                        <SelectItem value="company">Company</SelectItem>
                        <SelectItem value="status">Status</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Contacts Table */}
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Contact</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Tags</TableHead>
                          <TableHead>Source</TableHead>
                          <TableHead>Last Contact</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredContacts.map((contact) => (
                          <TableRow key={contact.id} className="hover:bg-gray-50">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="w-10 h-10">
                                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium text-sm">
                                    {getInitials(contact.name)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-gray-900">{contact.name}</div>
                                  {contact.position && (
                                    <div className="text-sm text-gray-500">{contact.position}</div>
                                  )}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {contact.company && (
                                  <>
                                    <Building className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm">{contact.company}</span>
                                  </>
                                )}
                                {contact.location && (
                                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>{contact.location}</span>
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span className="text-sm">{contact.email}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {contact.phone && (
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm">{contact.phone}</span>
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getStatusColor(contact.status)}>
                                {contact.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {contact.tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="outline"
                                    className={`text-xs ${getTagColor(tag)}`}
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-gray-600">{contact.source}</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-gray-600">
                                {new Date(contact.lastContact).toLocaleDateString()}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Empty state */}
                  {filteredContacts.length === 0 && (
                    <div className="text-center py-12">
                      <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
                      <p className="text-gray-500 mb-4">
                        {searchTerm || statusFilter !== "all" || sourceFilter !== "all"
                          ? "Try adjusting your search or filter criteria"
                          : "Add your first contact to get started"
                        }
                      </p>
                      {!searchTerm && statusFilter === "all" && sourceFilter === "all" && (
                        <Button 
                          onClick={() => setIsDialogOpen(true)}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
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
