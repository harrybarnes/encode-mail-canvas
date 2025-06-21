
import { useState } from "react";
import { Calendar, Clock, Edit2, Save, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";

interface CampaignScheduleSectionProps {
  campaign: any;
  onUpdate: (updates: any) => void;
}

export function CampaignScheduleSection({ campaign, onUpdate }: CampaignScheduleSectionProps) {
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalValue, setGoalValue] = useState(campaign.goal || "500");
  const [startDate, setStartDate] = useState<Date | undefined>(
    campaign.startDate ? new Date(campaign.startDate) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    campaign.endDate ? new Date(campaign.endDate) : undefined
  );

  const handleSaveGoal = () => {
    onUpdate({ goal: goalValue });
    setIsEditingGoal(false);
  };

  const handleCancelGoal = () => {
    setGoalValue(campaign.goal || "500");
    setIsEditingGoal(false);
  };

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
    if (date) {
      onUpdate({ startDate: date.toISOString() });
      // If end date is before the new start date, clear it
      if (endDate && date > endDate) {
        setEndDate(undefined);
        onUpdate({ endDate: null });
      }
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setEndDate(date);
    if (date) {
      onUpdate({ endDate: date.toISOString() });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Campaign Goal */}
      <Card className="transition-all duration-200 hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-100">
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-base">Campaign Goal</CardTitle>
              <CardDescription className="text-sm">
                Target number of emails to send
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {!isEditingGoal ? (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transition-colors hover:bg-gray-100">
              <div>
                <p className="font-medium text-gray-900">{goalValue} emails</p>
                <p className="text-sm text-gray-600">Total target</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditingGoal(true)}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <Label htmlFor="goal">Target Emails</Label>
                <Input
                  id="goal"
                  type="number"
                  value={goalValue}
                  onChange={(e) => setGoalValue(e.target.value)}
                  placeholder="500"
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSaveGoal}
                  className="bg-green-600 hover:bg-green-700 transition-colors"
                >
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelGoal}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Schedule Settings */}
      <Card className="transition-all duration-200 hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-green-100">
              <Clock className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-base">Schedule</CardTitle>
              <CardDescription className="text-sm">
                When to start and end the campaign
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="start-date" className="text-sm font-medium text-gray-700 mb-2 block">
              Start Date
            </Label>
            <DatePicker
              date={startDate}
              onDateChange={handleStartDateChange}
              placeholder="Select start date"
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="end-date" className="text-sm font-medium text-gray-700 mb-2 block">
              End Date
            </Label>
            <DatePicker
              date={endDate}
              onDateChange={handleEndDateChange}
              placeholder="Select end date"
              disabled={!startDate}
              className="w-full"
              // Disable dates before the start date
              disabledDate={(date) => startDate ? date < startDate : false}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
