
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, X, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface Scheme {
  id: number;
  name: string;
  description: string;
  eligibility: string;
  category: string;
  status: string;
  image: string;
  officialUrl: string;
  officer: string;
  color: string;
  detailedDescription: string;
  benefits: string[];
  documents: string[];
  applicationProcess: string[];
}

interface SchemeDetailsModalProps {
  scheme: Scheme | null;
  isOpen: boolean;
  onClose: () => void;
}

const SchemeDetailsModal = ({ scheme, isOpen, onClose }: SchemeDetailsModalProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  if (!scheme) return null;

  const getColorClasses = (color: string) => {
    const colorMap = {
      green: "bg-green-500 hover:bg-green-600",
      blue: "bg-blue-500 hover:bg-blue-600",
      purple: "bg-purple-500 hover:bg-purple-600",
      cyan: "bg-cyan-500 hover:bg-cyan-600",
      pink: "bg-pink-500 hover:bg-pink-600",
      rose: "bg-rose-500 hover:bg-rose-600"
    };
    return colorMap[color] || colorMap.blue;
  };

  const handleFileComplaint = () => {
    onClose();
    navigate('/report-issue', { state: { fromSchemes: true } });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center justify-between">
            {scheme.name}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="w-full h-64 rounded-lg overflow-hidden">
            <img 
              src={scheme.image} 
              alt={scheme.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center gap-4">
            <Badge variant={scheme.status === 'Active' ? 'default' : 'secondary'}>
              {t("active")}
            </Badge>
            <Badge variant="outline">{scheme.category}</Badge>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{scheme.detailedDescription}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Eligibility Criteria</h3>
            <p className="text-gray-700">{scheme.eligibility}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Key Benefits</h3>
            <ul className="list-disc list-inside space-y-1">
              {scheme.benefits.map((benefit, index) => (
                <li key={index} className="text-gray-700">{benefit}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Required Documents</h3>
            <ul className="list-disc list-inside space-y-1">
              {scheme.documents.map((doc, index) => (
                <li key={index} className="text-gray-700">{doc}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Application Process</h3>
            <ol className="list-decimal list-inside space-y-1">
              {scheme.applicationProcess.map((step, index) => (
                <li key={index} className="text-gray-700">{step}</li>
              ))}
            </ol>
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              className={`flex-1 ${getColorClasses(scheme.color)}`}
              onClick={() => window.open(scheme.officialUrl, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {t("applyNow")}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleFileComplaint}
              className="flex-1"
            >
              <FileText className="w-4 h-4 mr-2" />
              File Complaint
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              {t("close")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SchemeDetailsModal;
