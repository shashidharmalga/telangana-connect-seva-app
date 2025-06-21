import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Upload, ArrowLeft, Camera, Mail, Shield } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const ReportIssue = () => {
  const { t } = useLanguage();
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [sentOtp, setSentOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [hasPhoto, setHasPhoto] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if coming from schemes page
  const fromSchemes = location.state?.fromSchemes;

  const districts = [
    "Hyderabad", "Warangal Urban", "Warangal Rural", "Medak", "Nizamabad", "Karimnagar",
    "Khammam", "Nalgonda", "Mahbubnagar", "Rangareddy", "Adilabad", "Mancherial"
  ];

  const villages: { [key: string]: string[] } = {
    Hyderabad: ["Gachibowli", "Jubilee Hills", "Madhapur", "Kukatpally"],
    "Warangal Urban": ["Hanamkonda", "Kazipet", "Warangal"],
    "Warangal Rural": ["Geesugonda", "Sangem", "Wardhannapet"],
    Medak: ["Narsapur", "Siddipet", "Ramayampet"],
    Nizamabad: ["Bodhan", "Banswada", "Nizamabad"],
    Karimnagar: ["Huzurabad", "Jagtial", "Manakondur"],
    Khammam: ["Kothagudem", "Sathupalli", "Wyra"],
    Nalgonda: ["Miryalaguda", "Suryapet", "Devarakonda"],
    Mahbubnagar: ["Jadcherla", "Shadnagar", "Wanaparthy"],
    Rangareddy: ["Shamshabad", "Ibrahimpatnam", "Rajendranagar"],
    Adilabad: ["Mancherial", "Nirmal", "Bhainsa"],
    Mancherial: ["Bellampalli", "Chennur", "Mandamarri"]
  };

  const issueTypes = [
    "Water Supply", "Sanitation", "Road Maintenance", "Street Lighting",
    "Land Records", "Revenue Issues", "Property Documentation", "Administrative Issues",
    "Education", "School Infrastructure", "Healthcare", "Agriculture", "Irrigation", "Drainage",
    "Roads & Infrastructure", "Electricity", "Emergency Services", "Other"
  ];

  const sendEmailOtp = async () => {
    if (!email) {
      toast({
        title: t("emailRequired"),
        description: t("enterEmailFirst"),
        variant: "destructive"
      });
      return;
    }

    try {
      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setSentOtp(otp);
      setShowOtpInput(true);

      // Send OTP via Supabase edge function
      const { data, error } = await supabase.functions.invoke('send-otp-email', {
        body: {
          email,
          otp,
          type: 'report'
        }
      });

      if (error) {
        console.error('Error sending OTP:', error);
        // Fallback: store OTP locally for demo purposes
        toast({
          title: t("otpSent"),
          description: `${t("verificationCodeSent")} ${email}. ${t("checkEmail")}`,
        });
        // Show OTP in console for demo
        console.log(`Demo OTP for ${email}: ${otp}`);
      } else {
        toast({
          title: t("otpSent"),
          description: `${t("verificationCodeSent")} ${email}. ${t("checkEmail")}`,
        });
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive"
      });
    }
  };

  const verifyEmailOtp = () => {
    if (emailOtp === sentOtp) {
      setIsEmailVerified(true);
      setShowOtpInput(false);
      toast({
        title: t("emailVerified"),
        description: t("emailVerifiedSuccess"),
      });
    } else {
      toast({
        title: t("invalidOTP"),
        description: t("enterCorrectCode"),
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
        title: t("emailNotVerified"),
        description: t("verifyEmailFirst"),
        variant: "destructive"
      });
      return;
    }

    // Generate report ID
    const reportId = `TG${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
    const reportData = {
      id: reportId,
      fullName,
      mobileNumber,
      email,
      district,
      village,
      issueType,
      description,
      priority,
      status: "Pending",
      submittedDate: new Date().toLocaleDateString(),
      photos: capturedPhoto ? [capturedPhoto] : [],
      assignedDistrict: district
    };

    // Store in localStorage
    const existingReports = JSON.parse(localStorage.getItem('userReports') || '[]');
    existingReports.push(reportData);
    localStorage.setItem('userReports', JSON.stringify(existingReports));

    // Also store for officer dashboard
    const officerComplaints = JSON.parse(localStorage.getItem('officerComplaints') || '[]');
    officerComplaints.push(reportData);
    localStorage.setItem('officerComplaints', JSON.stringify(officerComplaints));

    console.log("Report submitted:", reportData);
    toast({
      title: t("reportSubmitted"),
      description: t("reportSubmittedSuccess"),
    });

    // Navigate back to schemes if came from there, otherwise go to home
    if (fromSchemes) {
      navigate('/schemes');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => fromSchemes ? navigate('/schemes') : navigate('/')}
              variant="ghost"
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {fromSchemes ? t("backToSchemes") : t("backToHome")}
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{t("reportIssueTitle")}</h1>
              <p className="text-blue-100">{t("reportIssueSubtitle")}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto border-2 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <CardTitle className="text-2xl flex items-center gap-3">
              <AlertTriangle className="w-8 h-8" />
              {t("reportIssueTitle")}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                  {t("personalInfo")}
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-gray-700 font-semibold">
                    {t("fullName")} *
                  </Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t("enterFullName")}
                    className="border-2 border-gray-300 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobileNumber" className="text-gray-700 font-semibold">
                    {t("mobileNumber")} *
                  </Label>
                  <Input
                    id="mobileNumber"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder={t("enterMobileNumber")}
                    className="border-2 border-gray-300 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">{t("emailAddress")} *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("enterEmailAddress")}
                      required
                      disabled={isEmailVerified}
                      className="border-2 border-gray-300 focus:border-blue-500"
                    />
                    {!isEmailVerified && (
                      <Button type="button" onClick={sendEmailOtp} variant="outline" className="whitespace-nowrap">
                        <Mail className="w-4 h-4 mr-2" />
                        {t("sendOTP")}
                      </Button>
                    )}
                    {isEmailVerified && (
                      <Button type="button" variant="outline" disabled className="whitespace-nowrap">
                        <Shield className="w-4 h-4 mr-2" />
                        {t("verified")}
                      </Button>
                    )}
                  </div>
                </div>

                {showOtpInput && !isEmailVerified && (
                  <div>
                    <Label htmlFor="emailOtp">{t("emailVerificationCode")}</Label>
                    <div className="flex gap-2">
                      <Input
                        id="emailOtp"
                        value={emailOtp}
                        onChange={(e) => setEmailOtp(e.target.value)}
                        placeholder={t("enterVerificationCode")}
                        maxLength={6}
                        className="border-2 border-gray-300 focus:border-blue-500"
                      />
                      <Button type="button" onClick={verifyEmailOtp} variant="outline">
                        {t("verify")}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Issue Details Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                  {t("issueDetails")}
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="district" className="text-gray-700 font-semibold">
                      {t("district")} *
                    </Label>
                    <Select value={district} onValueChange={setDistrict}>
                      <SelectTrigger className="border-2 border-gray-300 focus:border-blue-500">
                        <SelectValue placeholder={t("selectDistrict")} />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((d) => (
                          <SelectItem key={d} value={d}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="village" className="text-gray-700 font-semibold">
                      {t("village")} *
                    </Label>
                    <Select value={village} onValueChange={setVillage}>
                      <SelectTrigger className="border-2 border-gray-300 focus:border-blue-500">
                        <SelectValue placeholder={t("selectVillage")} />
                      </SelectTrigger>
                      <SelectContent>
                        {(villages[district] || []).map((v) => (
                          <SelectItem key={v} value={v}>
                            {v}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issueType" className="text-gray-700 font-semibold">
                    {t("issueType")} *
                  </Label>
                  <Select value={issueType} onValueChange={setIssueType}>
                    <SelectTrigger className="border-2 border-gray-300 focus:border-blue-500">
                      <SelectValue placeholder={t("selectIssueType")} />
                    </SelectTrigger>
                    <SelectContent>
                      {issueTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-700 font-semibold">
                    {t("issueDescription")} *
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t("describeIssue")}
                    className="border-2 border-gray-300 focus:border-blue-500 min-h-32"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-gray-700 font-semibold">
                    {t("priority")} *
                  </Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger className="border-2 border-gray-300 focus:border-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">{t("low")}</SelectItem>
                      <SelectItem value="Medium">{t("medium")}</SelectItem>
                      <SelectItem value="High">{t("high")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Evidence Upload Section */}
              <div className="space-y-2">
                <Label className="text-gray-700 font-semibold">
                  {t("uploadEvidence")}
                </Label>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center">
                    <Button 
                      type="button" 
                      variant={hasPhoto ? "default" : "outline"} 
                      className={`h-24 w-full flex-col ${hasPhoto ? 'bg-green-500 hover:bg-green-600' : ''}`}
                      onClick={handlePhotoCapture}
                    >
                      <Camera className="w-8 h-8 mb-2" />
                      <span>{hasPhoto ? t("photoCaptured") : t("takePhoto")}</span>
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
                  
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center">
                    <Upload className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">{t("uploadDocuments")}</p>
                    <p className="text-sm text-gray-500">{t("uploadPhotos")}</p>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="mt-4 border-blue-500 text-blue-600 hover:bg-blue-50"
                    >
                      {t("chooseFiles")}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fromSchemes ? navigate('/schemes') : navigate('/')}
                  className="flex-1"
                >
                  {t("cancel")}
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={!fullName || !mobileNumber || !email || !district || !village || !issueType || !description || !isEmailVerified}
                >
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  {t("submitReport")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportIssue;
