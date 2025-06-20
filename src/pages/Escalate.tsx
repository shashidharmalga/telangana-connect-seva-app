
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Upload, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Escalate = () => {
  const [complaintId, setComplaintId] = useState("");
  const [escalateReason, setEscalateReason] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [escalateTo, setEscalateTo] = useState("");
  const navigate = useNavigate();

  const escalationLevels = [
    "District Collector",
    "Chief Secretary",
    "Minister",
    "Chief Minister's Office"
  ];

  const escalationReasons = [
    "No response for more than 7 days",
    "Unsatisfactory resolution",
    "Corrupt practices observed",
    "Emergency situation",
    "Officer non-cooperation",
    "Issue worsening"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle escalation submission
    console.log("Escalation submitted");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-red-50">
      <header className="bg-gradient-to-r from-purple-600 to-red-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Escalate Complaint</h1>
              <p className="text-purple-100">File escalation for unresolved issues</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto border-2 border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-red-500 text-white">
            <CardTitle className="text-2xl flex items-center gap-3">
              <AlertTriangle className="w-8 h-8" />
              Escalate Your Complaint
            </CardTitle>
            <p className="text-purple-100">
              Use this form when your complaint hasn't been resolved satisfactorily
            </p>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="complaintId" className="text-gray-700 font-semibold">
                  Original Complaint ID *
                </Label>
                <Input
                  id="complaintId"
                  value={complaintId}
                  onChange={(e) => setComplaintId(e.target.value)}
                  placeholder="Enter your complaint ID (e.g., TG001)"
                  className="border-2 border-gray-300 focus:border-purple-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="escalateReason" className="text-gray-700 font-semibold">
                  Reason for Escalation *
                </Label>
                <Select value={escalateReason} onValueChange={setEscalateReason}>
                  <SelectTrigger className="border-2 border-gray-300 focus:border-purple-500">
                    <SelectValue placeholder="Select reason for escalation" />
                  </SelectTrigger>
                  <SelectContent>
                    {escalationReasons.map((reason) => (
                      <SelectItem key={reason} value={reason}>
                        {reason}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="escalateTo" className="text-gray-700 font-semibold">
                  Escalate To *
                </Label>
                <Select value={escalateTo} onValueChange={setEscalateTo}>
                  <SelectTrigger className="border-2 border-gray-300 focus:border-purple-500">
                    <SelectValue placeholder="Select escalation level" />
                  </SelectTrigger>
                  <SelectContent>
                    {escalationLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalDetails" className="text-gray-700 font-semibold">
                  Additional Details
                </Label>
                <Textarea
                  id="additionalDetails"
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                  placeholder="Provide additional context for escalation..."
                  className="border-2 border-gray-300 focus:border-purple-500 min-h-32"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-semibold">
                  Supporting Evidence
                </Label>
                <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Upload supporting documents</p>
                  <p className="text-sm text-gray-500">Photos, videos, or documents (Max 5MB each)</p>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="mt-4 border-purple-500 text-purple-600 hover:bg-purple-50"
                  >
                    Choose Files
                  </Button>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-yellow-800">Important Notice</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Escalations are reviewed by senior officials. Please ensure all information is accurate 
                      and you have given adequate time for initial resolution.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700"
                  disabled={!complaintId || !escalateReason || !escalateTo}
                >
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Submit Escalation
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Escalate;
