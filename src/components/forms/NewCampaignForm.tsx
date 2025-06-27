
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface NewCampaignFormProps {
  onSubmit: (campaignData: {
    name: string;
    goal: string;
    audience: string;
  }) => void;
  onCancel: () => void;
}

export function NewCampaignForm({ onSubmit, onCancel }: NewCampaignFormProps) {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [audience, setAudience] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && goal.trim() && audience.trim()) {
      onSubmit({ name: name.trim(), goal: goal.trim(), audience: audience.trim() });
    }
  };

  const isValid = name.trim() && goal.trim() && audience.trim();

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-gray-900">
          Create New Campaign
        </DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="campaign-name">Campaign Name</Label>
          <Input
            id="campaign-name"
            placeholder="e.g., Product Demo Outreach"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="campaign-goal">Campaign Goal</Label>
          <Input
            id="campaign-goal"
            placeholder="e.g., Get 10 product demos"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="campaign-audience">Target Audience</Label>
          <Textarea
            id="campaign-audience"
            placeholder="e.g., B2B SaaS founders with 10-50 employees, looking to improve their sales process"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="w-full min-h-[100px]"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isValid}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            Create Campaign
          </Button>
        </div>
      </form>
    </div>
  );
}
