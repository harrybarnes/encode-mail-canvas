
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface DeleteCampaignDialogProps {
  campaignName: string;
  onDelete: () => void;
}

export function DeleteCampaignDialog({ campaignName, onDelete }: DeleteCampaignDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDelete = async () => {
    setIsDeleting(true);
    // Simulate deletion process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onDelete();
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
          variant="ghost" 
          size="sm" 
          className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600 flex items-center gap-2">
            <Trash2 className="w-5 h-5" />
            Delete Campaign
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-900">
            Are you sure you want to delete <strong>"{campaignName}"</strong>? 
            <br /><br />
            <span className="text-gray-900 font-semibold">
              This action cannot be undone. All campaign data, including emails sent, 
              replies received, and analytics will be permanently lost.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isDeleting ? "Deleting..." : "Delete Campaign"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
