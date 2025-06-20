import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Search, Award, ArrowUp, Users, Clock, Shield, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-green-50">
      {/* Enhanced Header with Government Styling */}
      <header className="relative bg-gradient-to-r from-red-600 via-orange-600 to-red-700 text-white shadow-2xl overflow-hidden">
        {/* Government Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] repeat"></div>
        </div>

        {/* Ashoka Chakra Decorations */}
        <div className="absolute top-4 left-4 w-16 h-16 border-4 border-yellow-400 rounded-full flex items-center justify-center opacity-30">
          <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
        </div>
        <div className="absolute top-4 right-4 w-16 h-16 border-4 border-yellow-400 rounded-full flex items-center justify-center opacity-30">
          <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
        </div>

        <div className="relative container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                <MapPin className="w-10 h-10 text-red-600" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent animate-pulse">
                  तेलंगाना कनेक्ट
                </h1>
                <p className="text-xl text-yellow-100 font-semibold">Telangana Connect - तेलंगाना कनेक्ट - తెలంగాణ కనెక్ట్</p>
                <p className="text-yellow-200">जनता की आवाज़ • ప్రజల స్వరం • Voice of the People</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Button 
                onClick={() => navigate('/login')}
                variant="outline" 
                className="bg-white text-red-600 border-2 border-white hover:bg-red-50 font-semibold px-6 py-3"
              >
                <Shield className="w-5 h-5 mr-2" />
                Officer Login
              </Button>
            </div>
          </div>

          {/* Motivational Banner */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-red-800 p-4 rounded-lg shadow-lg border-2 border-yellow-300">
            <p className="text-center font-bold text-lg">
              "जनता का कल्याण हमारा लक्ष्य" | "ప్రజా కల్याణమే మా లక్ష్యం" | "Public Welfare is Our Goal"
            </p>
          </div>
        </div>
      </header>

      {/* Mobile Officer Login Button */}
      <div className="md:hidden bg-red-600 px-4 py-2">
        <Button 
          onClick={() => navigate('/login')}
          variant="outline" 
          className="w-full bg-white text-red-600 border-2 border-white hover:bg-red-50 font-semibold"
        >
          <Shield className="w-5 h-5 mr-2" />
          Officer Login
        </Button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Quick Action Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-red-200 bg-gradient-to-br from-red-50 to-orange-50">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Report Issue</h3>
              <p className="text-gray-600 mb-4">समस्या रिपोर्ट करें | సమస్యను నివేదించండి</p>
              <Button 
                onClick={() => navigate('/report-issue')}
                className="w-full bg-red-500 hover:bg-red-600"
              >
                Submit Report
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Track Progress</h3>
              <p className="text-gray-600 mb-4">प्रगति ट्रैक करें | పురోగతిని ట్రాక్ చేయండి</p>
              <Button 
                onClick={() => navigate('/track-progress')}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Track Status
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Schemes</h3>
              <p className="text-gray-600 mb-4">योजनाएं | పథకాలు</p>
              <Button 
                onClick={() => navigate('/schemes')}
                className="w-full bg-green-500 hover:bg-green-600"
              >
                View Schemes
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <ArrowUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Escalate</h3>
              <p className="text-gray-600 mb-4">एस्केलेट करें | ఎస్కలేట్ చేయండి</p>
              <Button 
                onClick={() => navigate('/escalate')}
                className="w-full bg-purple-500 hover:bg-purple-600"
              >
                Escalate Issue
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Key Features Section */}
        <Card className="mb-12 border-4 border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardHeader className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center">मुख्य विशेषताएं | ముख్య లక్షణాలు | Key Features</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">24/7 Support</h3>
                <p className="text-gray-600">Round-the-clock assistance for all your government-related queries and complaints.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Quick Resolution</h3>
                <p className="text-gray-600">Fast tracking and resolution of issues with real-time status updates.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Secure Platform</h3>
                <p className="text-gray-600">Your data and complaints are handled with utmost security and confidentiality.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Government Information */}
        <Card className="border-4 border-green-400 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center">तेलंगाना सरकार | తెలంగాణ ప్రభుత్వం | Government of Telangana</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-center">
              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-yellow-400">
                  <MapPin className="w-8 h-8 text-green-600" />
                </div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-orange-400">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-green-400">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                "सबका साथ, सबका विकास, सबका विश्वास" | "అందరి సహకారం, అందరి అభివృద్ధి, అందరి నమ్మకం"
              </p>
              <p className="text-gray-600">
                Together for Progress • Transparency • Accountability • Public Service
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
