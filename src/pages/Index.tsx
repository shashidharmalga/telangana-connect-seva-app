
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, FileText, TrendingUp, Users, MessageCircle, AlertTriangle } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { DistrictMap } from "@/components/DistrictMap";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [selectedIssueType, setSelectedIssueType] = useState("");
  const [selectedOfficer, setSelectedOfficer] = useState("");
  const navigate = useNavigate();

  const districts = [
    "Hyderabad", "Warangal Urban", "Warangal Rural", "Medak", "Nizamabad", "Karimnagar",
    "Khammam", "Nalgonda", "Mahbubnagar", "Rangareddy", "Adilabad", "Mancherial",
    "Komaram Bheem", "Nirmal", "Jagtial", "Peddapalli", "Jayashankar", "Mulugu",
    "Bhadradri Kothagudem", "Suryapet", "Yadadri Bhuvanagiri", "Jangaon", "Hanamkonda",
    "Mahabubabad", "Kamareddy", "Rajanna Sircilla", "Sangareddy", "Medchal-Malkajgiri",
    "Vikarabad", "Nagarkurnool", "Wanaparthy", "Narayanpet", "Jogulamba Gadwal"
  ];

  const issueTypes = [
    "Roads & Infrastructure", "Water Supply", "Electricity", "Healthcare", 
    "Education", "Agriculture", "Sanitation", "Welfare Schemes"
  ];

  const officers = [
    "Village Panchayat Secretary", "Mandal Officer", "PWD Officer", 
    "Irrigation Officer", "District Collector"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-4 border-red-500">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Telangana Connect</h1>
                <p className="text-sm text-gray-600">తెలంగాణ కనెక్ట్ | तेलंगाना कनेक्ट</p>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                Your Voice, <span className="text-red-500">Your District</span>, Your Government
              </h2>
              <p className="text-xl text-gray-600">
                Connect directly with your local officers, access government schemes, and track progress across all 33 districts of Telangana.
              </p>
              
              {/* Quick Selection */}
              <Card className="border-2 border-yellow-400">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Quick Start</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
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
                    
                    <Select value={selectedIssueType} onValueChange={setSelectedIssueType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Issue Type" />
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
                  
                  <Button 
                    className="w-full bg-red-500 hover:bg-red-600 text-white text-lg py-6"
                    onClick={() => navigate('/report-issue')}
                  >
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Report Issue Now
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-center">
              <DistrictMap />
            </div>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Governance Made Simple
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-red-500">
              <CardHeader>
                <FileText className="w-12 h-12 text-red-500 mb-4" />
                <CardTitle className="text-xl">Report Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Submit complaints with photos, videos, and voice recordings. Auto-escalation ensures your voice is heard.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-red-500 text-red-500 hover:bg-red-50"
                  onClick={() => navigate('/report-issue')}
                >
                  Start Reporting
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-yellow-500">
              <CardHeader>
                <Users className="w-12 h-12 text-yellow-600 mb-4" />
                <CardTitle className="text-xl">Government Schemes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Access Rythu Bandhu, Dalit Bandhu, Aasara Pension, and more. Check eligibility and apply online.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                  onClick={() => navigate('/schemes')}
                >
                  Explore Schemes
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-green-500">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-green-500 mb-4" />
                <CardTitle className="text-xl">Track Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Monitor your complaints in real-time. Get SMS and email updates when issues are resolved.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-green-500 text-green-500 hover:bg-green-50"
                  onClick={() => navigate('/track-progress')}
                >
                  Track Now
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500">
              <CardHeader>
                <MessageCircle className="w-12 h-12 text-blue-500 mb-4" />
                <CardTitle className="text-xl">Community Polls</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Vote on village priorities. Help officers understand what matters most to your community.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-blue-500 text-blue-500 hover:bg-blue-50"
                  onClick={() => navigate('/polls')}
                >
                  Participate
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-purple-500">
              <CardHeader>
                <AlertTriangle className="w-12 h-12 text-purple-500 mb-4" />
                <CardTitle className="text-xl">Escalate Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Automatic escalation to higher authorities if issues remain unresolved after 7 days.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-purple-500 text-purple-500 hover:bg-purple-50"
                  onClick={() => navigate('/escalate')}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-orange-500">
              <CardHeader>
                <FileText className="w-12 h-12 text-orange-500 mb-4" />
                <CardTitle className="text-xl">My Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  View history of all your reported issues with detailed status updates and evidence.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-orange-500 text-orange-500 hover:bg-orange-50"
                  onClick={() => navigate('/my-reports')}
                >
                  View Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 bg-gradient-to-r from-red-500 to-orange-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-6">About Telangana Connect</h3>
            <p className="text-lg leading-relaxed">
              Telangana Connect is a revolutionary digital governance platform designed to bridge the gap between citizens and government officials across all 33 districts of Telangana. From Village Panchayat Secretaries to District Collectors, our platform ensures your voice reaches the right authority. Whether you're reporting infrastructure issues, accessing welfare schemes like Rythu Bandhu and Dalit Bandhu, or tracking complaint progress, Telangana Connect empowers every citizen to participate actively in governance. With trilingual support and mobile-friendly design, we're making government services accessible to rural and urban communities alike, fostering transparency, accountability, and participatory democracy throughout Telangana.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Telangana Connect</h4>
              <p className="text-gray-300">
                Connecting citizens with their government across all 33 districts of Telangana.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/report-issue" className="hover:text-white">Report Issue</a></li>
                <li><a href="/schemes" className="hover:text-white">Government Schemes</a></li>
                <li><a href="/track-progress" className="hover:text-white">Track Progress</a></li>
                <li><a href="/polls" className="hover:text-white">Community Polls</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <p className="text-gray-300">
                For technical support, contact your local Mandal Officer or visit the nearest e-Seva center.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Telangana Connect. Serving all 33 districts with pride.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
