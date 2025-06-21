
import { useState } from "react";
import { Calendar, Edit, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CampaignScheduleSectionProps {
  startDate?: string;
  endDate?: string;
  onScheduleUpdate: (startDate: string, endDate: string) => void;
}

export function CampaignScheduleSection({ startDate, endDate, onScheduleUpdate }: CampaignScheduleSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftStartDate, setDraftStartDate] = useState(startDate || "");
  const [draftEndDate, setDraftEndDate] = useState(endDate || "");

  const startEditing = () => {
    const today = new Date().toISOString().split('T')[0];
    const weekFromToday = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    setDraftStartDate(startDate || today);
    setDraftEndDate(endDate || weekFromToday);
    setIsEditing(true);
  };

  const saveSchedule = () => {
    onScheduleUpdate(draftStartDate, draftEndDate);
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setDraftStartDate(startDate || "");
    setDraftEndDate(endDate || "");
    setIsEditing(false);
  };

  const handleStartDateChange = (newStartDate: string) => {
    setDraftStartDate(newStartDate);
    // Auto-update end date to 7 days after start date
    if (newStartDate) {
      const startDateObj = new Date(newStartDate);
      const endDateObj = new Date(startDateObj.getTime() + 7 * 24 * 60 * 60 * 1000);
      setDraftEndDate(endDateObj.toISOString().split('T')[0]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle>Campaign Schedule</CardTitle>
            <CardDescription>
              Set the start and end dates for your campaign
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!startDate && !endDate && !isEditing ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-4">No schedule configured</p>
            <Button onClick={startEditing} variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Set Schedule
            </Button>
          </div>
        ) : isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={draftStartDate}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={draftEndDate}
                  onChange={(e) => setDraftEndDate(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={saveSchedule} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Save Schedule
              </Button>
              <Button onClick={cancelEditing} variant="outline">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Start Date: <span className="font-medium">{new Date(startDate!).toLocaleDateString()}</span></p>
              <p className="text-sm text-gray-600">End Date: <span className="font-medium">{new Date(endDate!).toLocaleDateString()}</span></p>
            </div>
            <Button onClick={startEditing} variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Schedule
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
