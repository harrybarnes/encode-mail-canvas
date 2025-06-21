
import { useState } from "react";
import { Calendar, Clock, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { useToast } from "@/hooks/use-toast";

interface CampaignScheduleSectionProps {
  startDate: string;
  endDate: string;
  onScheduleUpdate: (startDate: string, endDate: string) => void;
}

export function CampaignScheduleSection({ 
  startDate, 
  endDate, 
  onScheduleUpdate 
}: CampaignScheduleSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(
    startDate ? new Date(startDate) : undefined
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(
    endDate ? new Date(endDate) : undefined
  );
  const { toast } = useToast();

  const handleStartScheduling = () => {
    const now = new Date();
    const defaultStart = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Tomorrow
    const defaultEnd = new Date(defaultStart.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days later
    
    setSelectedStartDate(defaultStart);
    setSelectedEndDate(defaultEnd);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (selectedStartDate && selectedEndDate) {
      onScheduleUpdate(
        selectedStartDate.toISOString().split('T')[0],
        selectedEndDate.toISOString().split('T')[0]
      );
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setSelectedStartDate(startDate ? new Date(startDate) : undefined);
    setSelectedEndDate(endDate ? new Date(endDate) : undefined);
    setIsEditing(false);
  };

  const handleStartDateChange = (date: Date | undefined) => {
    setSelectedStartDate(date);
    if (date && !selectedEndDate) {
      // Auto-set end date to 7 days after start date
      const autoEndDate = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
      setSelectedEndDate(autoEndDate);
    }
  };

  const hasSchedule = startDate && endDate;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-300 hover:scale-110">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Campaign Schedule</h2>
          <p className="text-gray-600">Set when your campaign should run</p>
        </div>
      </div>

      {!hasSchedule && !isEditing ? (
        <div className="text-center py-8 animate-fade-in">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No schedule set yet</p>
          <Button 
            onClick={handleStartScheduling}
            className="bg-purple-600 hover:bg-purple-700 transition-all duration-200 hover:scale-105"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Set Schedule
          </Button>
        </div>
      ) : isEditing ? (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <DatePicker
                date={selectedStartDate}
                onSelect={handleStartDateChange}
                placeholder="Select start date"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <DatePicker
                date={selectedEndDate}
                onSelect={setSelectedEndDate}
                placeholder="Select end date"
                disabled={!selectedStartDate}
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={handleSave}
              disabled={!selectedStartDate || !selectedEndDate}
              className="bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Schedule
            </Button>
            <Button 
              onClick={handleCancel}
              variant="outline"
              className="transition-all duration-200 hover:scale-105"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="bg-purple-50 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-purple-900">Start Date</p>
                <p className="text-lg text-purple-700">
                  {new Date(startDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-purple-900">End Date</p>
                <p className="text-lg text-purple-700">
                  {new Date(endDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="transition-all duration-200 hover:scale-105"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Edit Schedule
          </Button>
        </div>
      )}
    </div>
  );
}
