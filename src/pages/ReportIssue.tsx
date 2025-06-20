

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Camera, MapPin, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const ReportIssue = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    district: "",
    village: "",
    issueType: "",
    officer: "",
    description: "",
    location: ""
  });
  const [hasPhoto, setHasPhoto] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const districts = [
    "Hyderabad", "Warangal Urban", "Warangal Rural", "Medak", "Nizamabad", "Karimnagar",
    "Khammam", "Nalgonda", "Mahbubnagar", "Rangareddy", "Adilabad", "Mancherial"
  ];

  const issueTypes = [
    "Roads & Infrastructure", "Water Supply", "Electricity", "Healthcare", 
    "Education", "Agriculture", "Sanitation", "Welfare Schemes"
  ];

  const officers = [
    "Village Panchayat Secretary", "Mandal Officer", "PWD Officer", 
    "Irrigation Officer", "District Collector"
  ];

  const sendConfirmationMessage = (reportId: string) => {
    // In a real application, this would integrate with an SMS service
    console.log(`Sending confirmation SMS to ${formData.number}: Your complaint has been registered with ID: ${reportId}. Track your progress on our portal.`);
    
    toast({
      title: "Confirmation Sent",
      description: `A confirmation message has been sent to ${formData.number} with your report ID: ${reportId}`,
    });
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

  const handleVideoUpload = () => {
    if (videoInputRef.current) {
      videoInputRef.current.accept = "video/*";
      videoInputRef.current.capture = "environment";
      videoInputRef.current.click();
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHasVideo(true);
      toast({
        title: "Video Uploaded",
        description: "Video has been successfully uploaded.",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.number || !formData.district || !formData.village || !formData.issueType || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (formData.number.length !== 10) {
      toast({
        title: "Invalid Number",
        description: "Please enter a valid 10-digit mobile number.",
        variant: "destructive"
      });
      return;
    }

    if (!hasPhoto) {
      toast({
        title: "Missing Photo",
        description: "Photo upload is mandatory for reporting issues.",
        variant: "destructive"
      });
      return;
    }

    // Generate unique ID
    const reportId = `TG${Date.now().toString().slice(-6)}`;
    
    // Create report object
    const newReport = {
      id: reportId,
      ...formData,
      status: "Pending" as const,
      priority: "Medium" as const,
      submittedDate: new Date().toLocaleDateString('en-IN'),
      hasPhoto,
      hasVideo
    };

    // Save to user reports
    const existingUserReports = JSON.parse(localStorage.getItem('userReports') || '[]');
    existingUserReports.push(newReport);
    localStorage.setItem('userReports', JSON.stringify(existingUserReports));

    // Save to officer complaints (for officer dashboard)
    const existingOfficerComplaints = JSON.parse(localStorage.getItem('officerComplaints') || '[]');
    existingOfficerComplaints.push(newReport);
    localStorage.setItem('officerComplaints', JSON.stringify(existingOfficerComplaints));

    console.log("Issue reported:", newReport);
    
    // Send confirmation message
    sendConfirmationMessage(reportId);
    
    toast({
      title: "Report Submitted Successfully!",
      description: `Your report ID is ${reportId}. You can track its progress in My Reports.`,
    });

    // Reset form
    setFormData({
      name: "",
      number: "",
      district: "",
      village: "",
      issueType: "",
      officer: "",
      description: "",
      location: ""
    });
    setHasPhoto(false);
    setHasVideo(false);
    setCapturedPhoto(null);

    // Navigate to My Reports after a short delay
    setTimeout(() => {
      navigate('/my-reports');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <header className="bg-white shadow-sm border-b-4 border-red-500">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('backToHome')}
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">{t('reportIssue')}</h1>
          <p className="text-gray-600">समस्या रिपोर्ट करें | సమస్యను నివేదించండి</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-red-200">
            <CardHeader>
              <CardTitle className="text-2xl text-red-600">Submit Your Complaint</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information Section */}
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
                  
                  <div>
                    <Label htmlFor="name">Full Name / पूरा नाम / పూర్తి పేరు *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="number">Mobile Number / मोबाइल नंबर / మొబైల్ నంబర్ *</Label>
                    <Input
                      id="number"
                      value={formData.number}
                      onChange={(e) => setFormData({...formData, number: e.target.value})}
                      placeholder="Enter 10-digit mobile number"
                      maxLength={10}
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="district">District / जिला / జిల్లా *</Label>
                    <Select value={formData.district} onValueChange={(value) => 
                      setFormData({...formData, district: value})
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select District" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="village">Village / गांव / గ్రామం *</Label>
                    <Input
                      id="village"
                      value={formData.village}
                      onChange={(e) => setFormData({...formData, village: e.target.value})}
                      placeholder="Enter village name"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="issueType">Issue Type / समस्या प्रकार / సమస్య రకం *</Label>
                    <Select value={formData.issueType} onValueChange={(value) => 
                      setFormData({...formData, issueType: value})
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Issue Type" />
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

                  <div>
                    <Label htmlFor="officer">Responsible Officer / जिम्मेदार अधिकारी / బాధ్యతాయుత అధికారి</Label>
                    <Select value={formData.officer} onValueChange={(value) => 
                      setFormData({...formData, officer: value})
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Officer" />
                      </SelectTrigger>
                      <SelectContent>
                        {officers.map((officer) => (
                          <SelectItem key={officer} value={officer}>
                            {officer}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description / विवरण / వివరణ *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe the issue in detail..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location / स्थान / స్థానం</Label>
                  <div className="flex gap-2">
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="Enter specific location"
                    />
                    <Button type="button" variant="outline" size="icon">
                      <MapPin className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Enhanced File Upload Section with Camera */}
                <div className="space-y-4">
                  <Label>Evidence / प्रमाण / సాక్ష్యం</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Button 
                        type="button" 
                        variant={hasPhoto ? "default" : "outline"} 
                        className={`h-24 w-full flex-col ${hasPhoto ? 'bg-green-500 hover:bg-green-600' : ''}`}
                        onClick={handlePhotoCapture}
                      >
                        <Camera className="w-6 h-6 mb-2" />
                        <span className="text-sm">{hasPhoto ? 'Photo Captured ✓' : 'Take Photo *'}</span>
                      </Button>
                      {capturedPhoto && (
                        <div className="mt-2">
                          <img 
                            src={capturedPhoto} 
                            alt="Captured" 
                            className="w-full h-32 object-cover rounded-md border"
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
                    
                    <div className="space-y-2">
                      <Button 
                        type="button" 
                        variant={hasVideo ? "default" : "outline"} 
                        className={`h-24 w-full flex-col ${hasVideo ? 'bg-green-500 hover:bg-green-600' : ''}`}
                        onClick={handleVideoUpload}
                      >
                        <Upload className="w-6 h-6 mb-2" />
                        <span className="text-sm">{hasVideo ? 'Video Uploaded ✓' : 'Upload Video (Optional)'}</span>
                      </Button>
                      <input
                        ref={videoInputRef}
                        type="file"
                        accept="video/*"
                        capture="environment"
                        onChange={handleVideoChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-red-600 font-medium">
                    * Photo upload is mandatory for complaint submission
                  </p>
                  <p className="text-sm text-gray-600">
                    Maximum file size: 5MB | अधिकतम फ़ाइल का आकार: 5MB | గరిష్ట ఫైల్ పరిమాణం: 5MB
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-6 text-lg"
                  disabled={!hasPhoto}
                >
                  {t('submitReport')} / रिपोर्ट सबमिट करें / నివేదిక సమర్పించండి
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;

