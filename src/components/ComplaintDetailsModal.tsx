
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, User, FileText } from "lucide-react";

interface ComplaintDetailsModalProps {
  complaint: any;
  open: boolean;
  onClose: () => void;
  onStatusUpdate: (complaintId: string, newStatus: string) => void;
}

const ComplaintDetailsModal = ({ complaint, open, onClose, onStatusUpdate }: ComplaintDetailsModalProps) => {
  if (!complaint) return null;

  const handleStatusChange = (newStatus: string) => {
    onStatusUpdate(complaint.id, newStatus);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            Complaint Details - {complaint.id}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">District:</span>
              <span className="font-medium">{complaint.district}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Village:</span>
              <span className="font-medium">{complaint.village}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Issue Type:</span>
              <span className="font-medium">{complaint.issueType}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Submitted:</span>
              <span className="font-medium">{complaint.submittedDate}</span>
            </div>
          </div>

          {/* Status and Priority */}
          <div className="flex items-center gap-4">
            <div>
              <span className="text-sm text-gray-600">Status:</span>
              <Badge 
                variant={complaint.status === 'Completed' ? 'default' : 'secondary'}
                className={`ml-2 ${complaint.status === 'Completed' ? 'bg-green-500' : 
                            complaint.status === 'In Progress' ? 'bg-blue-500' : 'bg-yellow-500'}`}
              >
                {complaint.status}
              </Badge>
            </div>
            <div>
              <span className="text-sm text-gray-600">Priority:</span>
              <Badge 
                variant="outline"
                className={`ml-2 ${complaint.priority === 'High' ? 'border-red-500 text-red-600' : 
                            complaint.priority === 'Medium' ? 'border-yellow-500 text-yellow-600' : 
                            'border-green-500 text-green-600'}`}
              >
                {complaint.priority}
              </Badge>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description:</h3>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{complaint.description}</p>
          </div>

          {/* Location */}
          {complaint.location && (
            <div>
              <h3 className="font-semibold mb-2">Location:</h3>
              <p className="text-gray-700">{complaint.location}</p>
            </div>
          )}

          {/* Media Files Placeholder */}
          <div>
            <h3 className="font-semibold mb-2">Attached Files:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Photos will appear here</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Videos will appear here</p>
              </div>
            </div>
          </div>

          {/* Status Update */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Update Status:</h3>
            <div className="flex items-center gap-4">
              <Select value={complaint.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={onClose} variant="outline">
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComplaintDetailsModal;
