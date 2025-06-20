
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, FileText, TrendingUp, Users, MessageCircle, AlertTriangle, Shield, Star, CheckCircle, Clock } from "lucide-react";
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
    "Village Panchayat Secretary", "District Panchayath Officer", "MRO (Mandal Revenue Officer)",
    "Irrigation Officer", "Tahsildar", "District Revenue Officer", "DEO (District Education Officer)",
    "Additional Collector", "District Collector"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 relative overflow-hidden">
      {/* Enhanced Background Patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMjAgMjBMMjAgMEwwIDIweiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] repeat"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full shadow-2xl flex items-center justify-center opacity-10 animate-pulse">
        <Shield className="w-12 h-12 text-white" />
      </div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-green-500 to-yellow-500 rounded-full shadow-2xl flex items-center justify-center opacity-10 animate-pulse">
        <MapPin className="w-14 h-14 text-white" />
      </div>
      <div className="absolute top-1/2 right-10 w-16 h-16 bg-gradient-to-br from-yellow-500 to-red-500 rounded-full shadow-lg flex items-center justify-center opacity-10">
        <Star className="w-8 h-8 text-white" />
      </div>

      {/* Enhanced Header */}
      <header className="bg-white shadow-lg border-b-4 border-gradient-to-r from-red-500 to-orange-500 relative z-10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-xl animate-fade-in">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <div className="animate-slide-in-right">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Telangana Connect
                </h1>
                <p className="text-lg text-gray-600 font-medium">తెలంగాణ కనెక్ట్ | तेलंगाना कनेक्ट</p>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">Serving 33 Districts</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => navigate('/login')} 
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg transform hover:scale-105 transition-all duration-300"
                size="lg"
              >
                <Shield className="w-5 h-5 mr-2" />
                Officer Login
              </Button>
              <LanguageToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative py-16 overflow-hidden z-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                  Your Voice, <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Your District</span>
                </h2>
                <h3 className="text-3xl font-semibold text-gray-700">Your Government</h3>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Connect directly with your local officers, access government schemes, and track progress across all 33 districts of Telangana with transparency and efficiency.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="border-l-4 border-red-500 bg-gradient-to-br from-red-50 to-white">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">33</div>
                    <div className="text-sm text-gray-600">Districts</div>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-yellow-500 bg-gradient-to-br from-yellow-50 to-white">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-600">24/7</div>
                    <div className="text-sm text-gray-600">Support</div>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-green-500 bg-gradient-to-br from-green-50 to-white">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">3</div>
                    <div className="text-sm text-gray-600">Languages</div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Enhanced Quick Selection */}
              <Card className="border-4 border-gradient-to-r from-yellow-400 to-orange-400 shadow-2xl bg-gradient-to-br from-white to-yellow-50">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-orange-500" />
                    Quick Start Your Journey
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                      <SelectTrigger className="border-2 border-gray-300 focus:border-red-500">
                        <SelectValue placeholder="Select Your District" />
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
                      <SelectTrigger className="border-2 border-gray-300 focus:border-orange-500">
                        <SelectValue placeholder="Issue Category" />
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
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white text-xl py-8 shadow-xl transform hover:scale-105 transition-all duration-300"
                    onClick={() => navigate('/report-issue')}
                  >
                    <AlertTriangle className="w-6 h-6 mr-3" />
                    Report Issue Now
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-center animate-slide-in-right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-200 to-orange-200 rounded-3xl transform rotate-3 scale-105"></div>
                <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
                  <DistrictMap />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Main Features */}
      <section className="py-16 bg-gradient-to-r from-white via-gray-50 to-white relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              Governance Made <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Simple</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering citizens with direct access to government services and transparent communication channels
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-red-500 transform hover:scale-105 bg-gradient-to-br from-white to-red-50">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-800">Report Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Submit complaints with multimedia evidence. Auto-escalation ensures your voice reaches the right authority at the right time.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition-all duration-300"
                  onClick={() => navigate('/report-issue')}
                >
                  Start Reporting
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-yellow-500 transform hover:scale-105 bg-gradient-to-br from-white to-yellow-50">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-800">Government Schemes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Access Rythu Bandhu, Dalit Bandhu, Aasara Pension, and more. Check eligibility and apply with ease.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white transition-all duration-300"
                  onClick={() => navigate('/schemes')}
                >
                  Explore Schemes
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-green-500 transform hover:scale-105 bg-gradient-to-br from-white to-green-50">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-800">Track Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Monitor your complaints in real-time with detailed updates and notifications across all channels.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition-all duration-300"
                  onClick={() => navigate('/track-progress')}
                >
                  Track Now
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-purple-500 transform hover:scale-105 bg-gradient-to-br from-white to-purple-50">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-800">Escalate Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Automatic escalation to higher authorities for unresolved issues. Your concerns will be heard.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white transition-all duration-300"
                  onClick={() => navigate('/escalate')}
                >
                  Escalate Complaint
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-500 transform hover:scale-105 bg-gradient-to-br from-white to-blue-50">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-800">Community Polls</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Vote on village priorities and help officers understand community needs for better planning.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition-all duration-300"
                  onClick={() => navigate('/polls')}
                >
                  Participate
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-orange-500 transform hover:scale-105 bg-gradient-to-br from-white to-orange-50">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-800">My Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  View comprehensive history of all reported issues with detailed status updates and evidence.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white transition-all duration-300"
                  onClick={() => navigate('/my-reports')}
                >
                  View Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section className="py-16 bg-gradient-to-r from-red-500 via-orange-500 to-red-600 text-white relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="text-4xl font-bold mb-8">About Telangana Connect</h3>
            <p className="text-xl leading-relaxed">
              Telangana Connect is a revolutionary digital governance platform designed to bridge the gap between citizens and government officials across all 33 districts of Telangana. From Village Panchayat Secretaries to District Collectors, our platform ensures your voice reaches the right authority. Whether you're reporting infrastructure issues, accessing welfare schemes like Rythu Bandhu and Dalit Bandhu, or tracking complaint progress, Telangana Connect empowers every citizen to participate actively in governance. With trilingual support and mobile-friendly design, we're making government services accessible to rural and urban communities alike, fostering transparency, accountability, and participatory democracy throughout Telangana.
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold">Telangana Connect</h4>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Connecting citizens with their government across all 33 districts of Telangana with transparency and efficiency.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="/report-issue" className="hover:text-white transition-colors">Report Issue</a></li>
                <li><a href="/schemes" className="hover:text-white transition-colors">Government Schemes</a></li>
                <li><a href="/track-progress" className="hover:text-white transition-colors">Track Progress</a></li>
                <li><a href="/polls" className="hover:text-white transition-colors">Community Polls</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-3 text-gray-300">
                <li>Complaint Management</li>
                <li>Scheme Applications</li>
                <li>Progress Tracking</li>
                <li>Officer Dashboard</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <p className="text-gray-300 leading-relaxed">
                For technical support, contact your local Mandal Officer or visit the nearest e-Seva center.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Telangana Connect. Serving all 33 districts with pride and dedication.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
