
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Search, Award, ArrowUp, Users, Clock, Shield, MapPin, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as 'en' | 'te' | 'hi');
  };

  // Language-specific content
  const getMotivationalText = () => {
    switch (language) {
      case 'hi':
        return "जनता का कल्याण हमारा लक्ष्य";
      case 'te':
        return "ప్రజా కల్యాణమే మా లక్ష్యం";
      default:
        return "Public Welfare is Our Goal";
    }
  };

  const getSubtitleText = () => {
    switch (language) {
      case 'hi':
        return "जनता की आवाज़";
      case 'te':
        return "ప్రజల స్వరం";
      default:
        return "Voice of the People";
    }
  };

  const getReportText = () => {
    switch (language) {
      case 'hi':
        return "समस्या रिपोर्ट करें";
      case 'te':
        return "సమస్యను నివేదించండి";
      default:
        return "Report Your Issues";
    }
  };

  const getTrackText = () => {
    switch (language) {
      case 'hi':
        return "प्रगति ट्रैक करें";
      case 'te':
        return "పురోగతిని ట్రాక్ చేయండి";
      default:
        return "Track Your Progress";
    }
  };

  const getSchemesText = () => {
    switch (language) {
      case 'hi':
        return "योजनाएं";
      case 'te':
        return "పథకాలు";
      default:
        return "Government Schemes";
    }
  };

  const getEscalateText = () => {
    switch (language) {
      case 'hi':
        return "एस्केलेट करें";
      case 'te':
        return "ఎస్కలేట్ చేయండి";
      default:
        return "Escalate Issues";
    }
  };

  const getFeaturesTitle = () => {
    switch (language) {
      case 'hi':
        return "मुख्य विशेषताएं";
      case 'te':
        return "ముख్య లక్షణాలు";
      default:
        return "Key Features";
    }
  };

  const getGovTitle = () => {
    switch (language) {
      case 'hi':
        return "तेलंगाना सरकार";
      case 'te':
        return "తెలంగాణ ప్రభుత్వం";
      default:
        return "Government of Telangana";
    }
  };

  const getGovSlogan = () => {
    switch (language) {
      case 'hi':
        return "सबका साथ, सबका विकास, सबका विश्वास";
      case 'te':
        return "అందరి సహకారం, అందరి అభివృద్ధి, అందరి నమ్మకం";
      default:
        return "Together for Progress • Transparency • Accountability • Public Service";
    }
  };

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
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Seal_of_Telangana.svg/150px-Seal_of_Telangana.svg.png" 
                  alt="Telangana Logo"
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%23dc2626' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'/%3E%3Ccircle cx='12' cy='10' r='3'/%3E%3C/svg%3E";
                  }}
                />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent animate-pulse">
                  {t('title')}
                </h1>
                <p className="text-xl text-yellow-100 font-semibold">{t('subtitle')}</p>
                <p className="text-yellow-200">{getSubtitleText()}</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              {/* Language Selector */}
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-32 bg-white text-red-600 border-2 border-white">
                  <Globe className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="te">తెలుగు</SelectItem>
                  <SelectItem value="hi">हिंदी</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={() => navigate('/login')}
                variant="outline" 
                className="bg-white text-red-600 border-2 border-white hover:bg-red-50 font-semibold px-6 py-3"
              >
                <Shield className="w-5 h-5 mr-2" />
                {t('officerLogin')}
              </Button>
            </div>
          </div>

          {/* Motivational Banner */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-red-800 p-4 rounded-lg shadow-lg border-2 border-yellow-300">
            <p className="text-center font-bold text-lg">
              {getMotivationalText()}
            </p>
          </div>
        </div>
      </header>

      {/* Mobile Language and Officer Login */}
      <div className="md:hidden bg-red-600 px-4 py-2 flex justify-between items-center">
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-32 bg-white text-red-600">
            <Globe className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="te">తెలుగు</SelectItem>
            <SelectItem value="hi">हिंदी</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          onClick={() => navigate('/login')}
          variant="outline" 
          className="bg-white text-red-600 border-2 border-white hover:bg-red-50 font-semibold"
        >
          <Shield className="w-5 h-5 mr-2" />
          {t('officerLogin')}
        </Button>
      </div>

      {/* Telangana Secretariat Image Section */}
      <div className="relative">
        <div className="w-full h-64 md:h-80 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=400&fit=crop" 
            alt="Telangana Secretariat"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                {language === 'hi' ? 'तेलंगाना सचिवालय' : 
                 language === 'te' ? 'తెలంగాణ సచివాలయం' : 
                 'Telangana Secretariat'}
              </h2>
              <p className="text-lg md:text-xl">
                {language === 'hi' ? 'जनता की सेवा में' : 
                 language === 'te' ? 'ప్రజల సేవలో' : 
                 'Serving the People'}
              </p>
            </div>
          </div>
        </div>
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
              <h3 className="text-xl font-bold text-gray-800 mb-2">{t('reportIssue')}</h3>
              <p className="text-gray-600 mb-4">{getReportText()}</p>
              <Button 
                onClick={() => navigate('/report-issue')}
                className="w-full bg-red-500 hover:bg-red-600"
              >
                {t('submitReport')}
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{t('trackProgress')}</h3>
              <p className="text-gray-600 mb-4">{getTrackText()}</p>
              <Button 
                onClick={() => navigate('/track-progress')}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                {t('trackStatus')}
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{t('schemes')}</h3>
              <p className="text-gray-600 mb-4">{getSchemesText()}</p>
              <Button 
                onClick={() => navigate('/schemes')}
                className="w-full bg-green-500 hover:bg-green-600"
              >
                {t('viewSchemes')}
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <ArrowUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{t('escalate')}</h3>
              <p className="text-gray-600 mb-4">{getEscalateText()}</p>
              <Button 
                onClick={() => navigate('/escalate')}
                className="w-full bg-purple-500 hover:bg-purple-600"
              >
                {t('escalateIssue')}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Key Features Section */}
        <Card className="mb-12 border-4 border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardHeader className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center">{getFeaturesTitle()}</CardTitle>
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
            <CardTitle className="text-2xl text-center">{getGovTitle()}</CardTitle>
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
                "{getGovSlogan()}"
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
