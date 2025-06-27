
import { useState } from "react";
import { Users, Sparkles, Edit, Save, X, Trash2, Plus, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  title: string;
}

interface Campaign {
  id: number;
  audience: string;
}

interface LeadListSectionProps {
  campaign: Campaign;
  onLeadsUpdate: (leads: Lead[]) => void;
}

export function LeadListSection({ campaign, onLeadsUpdate }: LeadListSectionProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isManualDialogOpen, setIsManualDialogOpen] = useState(false);
  const [audienceSize, setAudienceSize] = useState(50);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  
  // Manual lead entry form state
  const [manualLead, setManualLead] = useState({
    name: "",
    email: "",
    company: "",
    title: ""
  });

  const generateLeads = async () => {
    setIsGenerating(true);
    
    // Simulate AI lead generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Get the highest existing ID to continue numbering
    const maxId = leads.length > 0 ? Math.max(...leads.map(lead => lead.id)) : 0;
    
    const generatedLeads: Lead[] = Array.from({ length: audienceSize }, (_, i) => ({
      id: maxId + i + 1,
      name: `Lead ${maxId + i + 1}`,
      email: `lead${maxId + i + 1}@company${Math.floor((maxId + i) / 3) + 1}.com`,
      company: `Company ${Math.floor((maxId + i) / 3) + 1}`,
      title: ['CEO', 'CTO', 'VP Sales', 'Marketing Director'][(maxId + i) % 4]
    }));
    
    // Append new leads to existing ones instead of replacing
    const updatedLeads = [...leads, ...generatedLeads];
    setLeads(updatedLeads);
    onLeadsUpdate(updatedLeads);
    setIsGenerating(false);
    setIsDialogOpen(false);
  };

  const addManualLead = () => {
    if (!manualLead.name || !manualLead.email || !manualLead.company || !manualLead.title) {
      return; // Don't add if any field is empty
    }

    const newLead: Lead = {
      id: Date.now(), // Simple ID generation
      ...manualLead
    };

    const updatedLeads = [...leads, newLead];
    setLeads(updatedLeads);
    onLeadsUpdate(updatedLeads);
    
    // Reset form
    setManualLead({
      name: "",
      email: "",
      company: "",
      title: ""
    });
    
    setIsManualDialogOpen(false);
  };

  const deleteLead = (leadId: number) => {
    const updatedLeads = leads.filter(lead => lead.id !== leadId);
    setLeads(updatedLeads);
    onLeadsUpdate(updatedLeads);
  };

  const updateLead = (updatedLead: Lead) => {
    const updatedLeads = leads.map(lead => 
      lead.id === updatedLead.id ? updatedLead : lead
    );
    setLeads(updatedLeads);
    onLeadsUpdate(updatedLeads);
    setEditingLead(null);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle>Target Audience</CardTitle>
            <CardDescription>
              Generate and manage your list of potential leads
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {leads.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No leads generated yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Generate a targeted list of leads based on your campaign audience: {campaign.audience}
            </p>
            <div className="flex gap-3 justify-center">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Leads
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Generate Target Leads</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="audience-size">Number of leads to generate</Label>
                      <Input
                        id="audience-size"
                        type="number"
                        value={audienceSize}
                        onChange={(e) => setAudienceSize(parseInt(e.target.value))}
                        min={1}
                        max={500}
                        className="mt-1"
                      />
                    </div>
                    <p className="text-sm text-gray-600">
                      AI will find leads matching: {campaign.audience}
                    </p>
                    <Button 
                      onClick={generateLeads}
                      disabled={isGenerating}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      {isGenerating ? (
                        <>
                          <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                          Generating {audienceSize} leads...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate {audienceSize} Leads
                        </>
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isManualDialogOpen} onOpenChange={setIsManualDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Manually
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Lead Manually</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="manual-name">Name</Label>
                      <Input
                        id="manual-name"
                        value={manualLead.name}
                        onChange={(e) => setManualLead({...manualLead, name: e.target.value})}
                        placeholder="Enter lead name..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="manual-email">Email</Label>
                      <Input
                        id="manual-email"
                        type="email"
                        value={manualLead.email}
                        onChange={(e) => setManualLead({...manualLead, email: e.target.value})}
                        placeholder="Enter email address..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="manual-company">Company</Label>
                      <Input
                        id="manual-company"
                        value={manualLead.company}
                        onChange={(e) => setManualLead({...manualLead, company: e.target.value})}
                        placeholder="Enter company name..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="manual-title">Title</Label>
                      <Input
                        id="manual-title"
                        value={manualLead.title}
                        onChange={(e) => setManualLead({...manualLead, title: e.target.value})}
                        placeholder="Enter job title..."
                        className="mt-1"
                      />
                    </div>
                    <Button 
                      onClick={addManualLead}
                      disabled={!manualLead.name || !manualLead.email || !manualLead.company || !manualLead.title}
                      className="w-full"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add Lead
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Generated Leads ({leads.length})</h3>
              <div className="flex gap-2">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Generate More
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Generate More Leads</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="audience-size">Number of additional leads</Label>
                        <Input
                          id="audience-size"
                          type="number"
                          value={audienceSize}
                          onChange={(e) => setAudienceSize(parseInt(e.target.value))}
                          min={1}
                          max={500}
                          className="mt-1"
                        />
                      </div>
                      <Button 
                        onClick={generateLeads}
                        disabled={isGenerating}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      >
                        {isGenerating ? (
                          <>
                            <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generate {audienceSize} More Leads
                          </>
                        )}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={isManualDialogOpen} onOpenChange={setIsManualDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add Manually
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Lead Manually</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="manual-name">Name</Label>
                        <Input
                          id="manual-name"
                          value={manualLead.name}
                          onChange={(e) => setManualLead({...manualLead, name: e.target.value})}
                          placeholder="Enter lead name..."
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="manual-email">Email</Label>
                        <Input
                          id="manual-email"
                          type="email"
                          value={manualLead.email}
                          onChange={(e) => setManualLead({...manualLead, email: e.target.value})}
                          placeholder="Enter email address..."
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="manual-company">Company</Label>
                        <Input
                          id="manual-company"
                          value={manualLead.company}
                          onChange={(e) => setManualLead({...manualLead, company: e.target.value})}
                          placeholder="Enter company name..."
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="manual-title">Title</Label>
                        <Input
                          id="manual-title"
                          value={manualLead.title}
                          onChange={(e) => setManualLead({...manualLead, title: e.target.value})}
                          placeholder="Enter job title..."
                          className="mt-1"
                        />
                      </div>
                      <Button 
                        onClick={addManualLead}
                        disabled={!manualLead.name || !manualLead.email || !manualLead.company || !manualLead.title}
                        className="w-full"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add Lead
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto space-y-2">
              {leads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  {editingLead?.id === lead.id ? (
                    <div className="flex-1 grid grid-cols-4 gap-2">
                      <Input
                        value={editingLead.name}
                        onChange={(e) => setEditingLead({...editingLead, name: e.target.value})}
                        placeholder="Name"
                      />
                      <Input
                        value={editingLead.email}
                        onChange={(e) => setEditingLead({...editingLead, email: e.target.value})}
                        placeholder="Email"
                      />
                      <Input
                        value={editingLead.company}
                        onChange={(e) => setEditingLead({...editingLead, company: e.target.value})}
                        placeholder="Company"
                      />
                      <Input
                        value={editingLead.title}
                        onChange={(e) => setEditingLead({...editingLead, title: e.target.value})}
                        placeholder="Title"
                      />
                    </div>
                  ) : (
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium">{lead.name}</p>
                          <p className="text-sm text-gray-600">{lead.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{lead.company}</p>
                          <p className="text-sm text-gray-600">{lead.title}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    {editingLead?.id === lead.id ? (
                      <>
                        <Button size="sm" onClick={() => updateLead(editingLead)}>
                          <Save className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingLead(null)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="outline" onClick={() => setEditingLead(lead)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteLead(lead.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
