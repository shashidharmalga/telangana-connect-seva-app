
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Upload, ArrowLeft, Camera, Mail, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Escalate = () => {
  const [complaintId, setComplaintId] = useState("");
  const [email, setEmail] = useState("");
  const [escalateReason, setEscalateReason] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [escalateTo, setEscalateTo] = useState("");
  const [hasPhoto, setHasPhoto] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [emailOtp, setEmailOtp] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [sentOtp, setSentOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const escalationLevels = [
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

  const sendEmailOtp = () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address first.",
        variant: "destructive"
      });
      return;
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setSentOtp(otp);
    setShowOtpInput(true);

    // Simulate sending email (in real app, this would call an API)
    console.log(`Sending OTP ${otp} to email: ${email}`);
    
    toast({
      title: "OTP Sent",
      description: `Verification code sent to ${email}. Please check your email.`,
    });

    // For demo purposes, show OTP in console
    setTimeout(() => {
      alert(`Demo OTP for ${email}: ${otp}`);
    }, 1000);
  };

  const verifyEmailOtp = () => {
    if (emailOtp === sentOtp) {
      setIsEmailVerified(true);
      setShowOtpInput(false);
      toast({
        title: "Email Verified",
        description: "Your email has been successfully verified.",
      });
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct verification code.",
        variant: "destructive"
      });
    }
  };

  const handlePhotoCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = "image/*";
      fileInputRef.current.capture = "environment";
      fileInputRef.current.click();
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCapturedPhoto(result);
        setHasPhoto(true);
        toast({
          title: "Photo Captured",
          description: "Photo has been successfully captured and uploaded.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isEmailVerified) {
      toast({
        title: "Email Not Verified",
        description: "Please verify your email address before submitting escalation.",
        variant: "destructive"
      });
      return;
    }

    // Handle escalation submission
    console.log("Escalation submitted");
    toast({
      title: "Escalation Submitted",
      description: "Your escalation has been submitted successfully.",
    });
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

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    disabled={isEmailVerified}
                    className="border-2 border-gray-300 focus:border-purple-500"
                  />
                  {!isEmailVerified && (
                    <Button type="button" onClick={sendEmailOtp} variant="outline" className="whitespace-nowrap">
                      <Mail className="w-4 h-4 mr-2" />
                      Send OTP
                    </Button>
                  )}
                  {isEmailVerified && (
                    <Button type="button" variant="outline" disabled className="whitespace-nowrap">
                      <Shield className="w-4 h-4 mr-2" />
                      Verified
                    </Button>
                  )}
                </div>
              </div>

              {showOtpInput && !isEmailVerified && (
                <div>
                  <Label htmlFor="emailOtp">Email Verification Code</Label>
                  <div className="flex gap-2">
                    <Input
                      id="emailOtp"
                      value={emailOtp}
                      onChange={(e) => setEmailOtp(e.target.value)}
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      className="border-2 border-gray-300 focus:border-purple-500"
                    />
                    <Button type="button" onClick={verifyEmailOtp} variant="outline">
                      Verify
                    </Button>
                  </div>
                </div>
              )}

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
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center">
                    <Button 
                      type="button" 
                      variant={hasPhoto ? "default" : "outline"} 
                      className={`h-24 w-full flex-col ${hasPhoto ? 'bg-green-500 hover:bg-green-600' : ''}`}
                      onClick={handlePhotoCapture}
                    >
                      <Camera className="w-8 h-8 mb-2" />
                      <span>{hasPhoto ? 'Photo Captured ✓' : 'Take Photo'}</span>
                    </Button>
                    {capturedPhoto && (
                      <div className="mt-4">
                        <img 
                          src={capturedPhoto} 
                          alt="Captured evidence" 
                          className="w-full max-w-md mx-auto h-48 object-cover rounded-md border"
                        />
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </div>
                  
                  <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center">
                    <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Upload additional documents</p>
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
                  disabled={!complaintId || !escalateReason || !escalateTo || !isEmailVerified}
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
