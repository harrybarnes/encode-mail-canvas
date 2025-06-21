
import { useState } from "react";
import { Calendar, Edit, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";

interface CampaignScheduleSectionProps {
  startDate?: string;
  endDate?: string;
  onScheduleUpdate: (startDate: string, endDate: string) => void;
}

export function CampaignScheduleSection({ startDate, endDate, onScheduleUpdate }: CampaignScheduleSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftStartDate, setDraftStartDate] = useState<Date | undefined>(
    startDate ? new Date(startDate) : undefined
  );
  const [draftEndDate, setDraftEndDate] = useState<Date | undefined>(
    endDate ? new Date(endDate) : undefined
  );

  const startEditing = () => {
    const today = new Date();
    const weekFromToday = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    
    setDraftStartDate(startDate ? new Date(startDate) : today);
    setDraftEndDate(endDate ? new Date(endDate) : weekFromToday);
    setIsEditing(true);
  };

  const saveSchedule = () => {
    if (draftStartDate && draftEndDate) {
      onScheduleUpdate(
        draftStartDate.toISOString().split('T')[0],
        draftEndDate.toISOString().split('T')[0]
      );
    }
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setDraftStartDate(startDate ? new Date(startDate) : undefined);
    setDraftEndDate(endDate ? new Date(endDate) : undefined);
    setIsEditing(false);
  };

  const handleStartDateChange = (newStartDate: Date | undefined) => {
    setDraftStartDate(newStartDate);
    // Auto-update end date to 7 days after start date
    if (newStartDate) {
      const endDateObj = new Date(newStartDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      setDraftEndDate(endDateObj);
    }
  };

  return (
    <Card className="transition-all hover:shadow-md">
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
          <div className="text-center py-8 bg-gray-50 rounded-lg transition-all hover:bg-gray-100">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-4">No schedule configured</p>
            <Button onClick={startEditing} variant="outline" className="transition-all hover:scale-105">
              <Calendar className="w-4 h-4 mr-2" />
              Set Schedule
            </Button>
          </div>
        ) : isEditing ? (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-date">Start Date</Label>
                <DatePicker
                  date={draftStartDate}
                  onDateChange={handleStartDateChange}
                  placeholder="Select start date"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="end-date">End Date</Label>
                <DatePicker
                  date={draftEndDate}
                  onDateChange={setDraftEndDate}
                  placeholder="Select end date"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={saveSchedule} className="bg-green-600 hover:bg-green-700 transition-all hover:scale-105">
                <Save className="w-4 h-4 mr-2" />
                Save Schedule
              </Button>
              <Button onClick={cancelEditing} variant="outline" className="transition-all hover:scale-105">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center animate-fade-in">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Start Date: <span className="font-medium">{new Date(startDate!).toLocaleDateString()}</span></p>
              <p className="text-sm text-gray-600">End Date: <span className="font-medium">{new Date(endDate!).toLocaleDateString()}</span></p>
            </div>
            <Button onClick={startEditing} variant="outline" className="transition-all hover:scale-105">
              <Edit className="w-4 h-4 mr-2" />
              Edit Schedule
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
