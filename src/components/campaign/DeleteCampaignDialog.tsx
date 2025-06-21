
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface DeleteCampaignDialogProps {
  campaignName: string;
  campaignId: number;
}

export function DeleteCampaignDialog({ campaignName, campaignId }: DeleteCampaignDialogProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    
    // Simulate deletion process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Campaign Deleted",
      description: `"${campaignName}" has been permanently deleted.`,
      variant: "destructive",
    });
    
    navigate("/");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 transition-all duration-200 hover:scale-105"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="animate-scale-in">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-full bg-red-100">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <AlertDialogTitle className="text-xl">Delete Campaign</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-base leading-relaxed">
            Are you absolutely sure you want to delete <strong>"{campaignName}"</strong>? 
            This action cannot be undone and will permanently remove all campaign data, 
            including sent emails, replies, and analytics.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-3">
          <AlertDialogCancel className="transition-all duration-200 hover:scale-105">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 transition-all duration-200 hover:scale-105"
          >
            {isDeleting ? "Deleting..." : "Delete Campaign"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
