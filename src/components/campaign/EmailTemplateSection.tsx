
import { useState } from "react";
import { Mail, Sparkles, Edit, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Campaign {
  id: number;
  name: string;
  goal: string;
  audience: string;
}

interface EmailTemplateSectionProps {
  campaign: Campaign;
}

export function EmailTemplateSection({ campaign }: EmailTemplateSectionProps) {
  const [emailTemplate, setEmailTemplate] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [draftTemplate, setDraftTemplate] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateTemplate = async () => {
    setIsGenerating(true);
    
    // Simulate API call to generate email template
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedTemplate = `Subject: Quick question about ${campaign.goal.toLowerCase()}

Hi [First Name],

I hope this email finds you well. I noticed that your company might be a great fit for what we're working on.

${campaign.goal} - and I believe there's a potential opportunity for us to collaborate.

Given your background with ${campaign.audience.toLowerCase()}, I'd love to share how we're helping similar companies achieve their goals.

Would you be open to a brief 15-minute call this week to explore if there's a mutual fit?

Best regards,
[Your Name]

P.S. I'd be happy to send over some case studies from similar companies we've worked with.`;
    
    setDraftTemplate(generatedTemplate);
    setIsEditing(true);
    setIsGenerating(false);
  };

  const saveTemplate = () => {
    setEmailTemplate(draftTemplate);
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setDraftTemplate(emailTemplate || "");
    setIsEditing(false);
  };

  const startEditing = () => {
    setDraftTemplate(emailTemplate || "");
    setIsEditing(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle>Email Template</CardTitle>
            <CardDescription>
              Create and customize your cold email template for this campaign
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!emailTemplate && !isEditing ? (
          // Empty state
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No email template created yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Create a personalized email template for your {campaign.name} campaign. 
              Our AI will generate an optimized template based on your campaign goal and target audience.
            </p>
            <Button 
              onClick={generateTemplate}
              disabled={isGenerating}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Generating Template...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create Email Template
                </>
              )}
            </Button>
          </div>
        ) : isEditing ? (
          // Editing state
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Template
              </label>
              <Textarea
                value={draftTemplate}
                onChange={(e) => setDraftTemplate(e.target.value)}
                placeholder="Enter your email template..."
                rows={15}
                className="font-mono text-sm"
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={saveTemplate} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Save Template
              </Button>
              <Button onClick={cancelEditing} variant="outline">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          // Display saved template
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                {emailTemplate}
              </pre>
            </div>
            <div className="flex gap-3">
              <Button onClick={startEditing} variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit Template
              </Button>
              <Button 
                onClick={generateTemplate}
                disabled={isGenerating}
                variant="outline"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Regenerating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Regenerate Template
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
