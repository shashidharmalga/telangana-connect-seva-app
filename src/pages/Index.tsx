import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, TrendingUp, Building, AlertTriangle, User, Phone, Sparkles, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import ChatBotToggle from "@/components/ChatBotToggle";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const features = [
    {
      icon: FileText,
      titleKey: "reportIssue",
      descriptionKey: "submitReport",
      action: () => navigate("/report-issue"),
      color: "bg-gradient-to-br from-blue-500 to-cyan-400",
      hoverColor: "hover:from-blue-600 hover:to-cyan-500"
    },
    {
      icon: TrendingUp,
      titleKey: "trackProgress",
      descriptionKey: "trackStatus",
      action: () => navigate("/track-progress"),
      color: "bg-gradient-to-br from-green-500 to-emerald-400",
      hoverColor: "hover:from-green-600 hover:to-emerald-500"
    },
    {
      icon: Building,
      titleKey: "schemes",
      descriptionKey: "viewSchemes",
      action: () => navigate("/schemes"),
      color: "bg-gradient-to-br from-purple-500 to-pink-400",
      hoverColor: "hover:from-purple-600 hover:to-pink-500"
    },
    {
      icon: AlertTriangle,
      titleKey: "escalate",
      descriptionKey: "escalateIssue",
      action: () => navigate("/escalate"),
      color: "bg-gradient-to-br from-red-500 to-orange-400",
      hoverColor: "hover:from-red-600 hover:to-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-gradient-to-br from-green-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Enhanced Header */}
      <header className="bg-gradient-to-r from-white/95 via-blue-50/95 to-purple-50/95 backdrop-blur-lg shadow-2xl border-b border-gradient-to-r from-blue-200/50 to-purple-200/50 relative z-10 sticky top-0">
        {/* Decorative top border */}
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Enhanced Logo Section */}
            <div className="flex items-center space-x-4 animate-slide-in-right group">
              <div className="relative">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 hover:rotate-3 transition-all duration-500 group-hover:shadow-blue-500/25 p-1">
                  <img 
                    src="/lovable-uploads/08104989-29a7-4a34-b795-fa37509b76d0.png" 
                    alt="Government of Telangana Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Floating decorative elements */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-75 animate-pulse"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-br from-green-400 to-blue-400 rounded-full opacity-75 animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
              <div className="group-hover:translate-x-1 transition-transform duration-300">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
                  {t("title")}
                </h1>
                <p className="text-sm text-gray-600 font-medium">{t("subtitle")}</p>
              </div>
            </div>

            {/* Enhanced Right Section */}
            <div className="flex items-center gap-6 animate-fade-in">
              {/* Language Toggle with enhanced styling */}
              <div className="transform hover:scale-105 transition-all duration-300">
                <LanguageToggle />
              </div>
              
              {/* Enhanced Officer Login Button */}
              <Button 
                variant="outline" 
                onClick={() => navigate("/login")}
                className="group relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white border-none hover:from-indigo-600 hover:via-purple-700 hover:to-pink-700 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl px-6 py-3 rounded-xl font-semibold"
              >
                {/* Animated background overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                
                <div className="relative flex items-center gap-2">
                  <User className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  <span>{t("officerLogin")}</span>
                </div>
                
                {/* Floating particles effect */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{animationDelay: '0.3s'}}></div>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom gradient decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
      </header>

      {/* Background Image Section */}
      <section 
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/5a1b6e94-87f6-4384-81bb-6dc37fb98003.png')`
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              Government of Telangana
            </h2>
            <p className="text-xl md:text-2xl drop-shadow-md">
              Digital Governance for Better Tomorrow
            </p>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <div className="flex justify-center mb-6">
              <Sparkles className="w-12 h-12 text-yellow-500 animate-pulse" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6 animate-scale-in">
              {t("title")}
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto animate-slide-in-right" style={{animationDelay: '0.3s'}}>
              {t("subtitle")} - Connect with your government across all 33 districts of Telangana
            </p>
            <div className="flex justify-center">
              <Heart className="w-8 h-8 text-red-500 animate-pulse" style={{animationDelay: '1s'}} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 bg-white/70 backdrop-blur-sm border-white/40 animate-fade-in group overflow-hidden relative"
                onClick={feature.action}
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="text-center pb-4 relative z-10">
                  <div className={`w-20 h-20 ${feature.color} ${feature.hoverColor} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform transition-all duration-300 group-hover:rotate-12`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    {t(feature.titleKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-center text-gray-600">
                    {t(feature.descriptionKey)}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 bg-gradient-to-r from-pink-100/50 via-purple-100/50 to-indigo-100/50 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
            Quick Actions
          </h3>
          <div className="flex flex-wrap justify-center gap-6 animate-slide-in-right" style={{animationDelay: '0.3s'}}>
            <Button 
              onClick={() => navigate("/my-reports")} 
              variant="outline" 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-none hover:from-blue-600 hover:to-cyan-600 transform hover:scale-110 transition-all duration-300 shadow-lg"
            >
              My Reports
            </Button>
            <Button 
              onClick={() => navigate("/schemes")} 
              variant="outline" 
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-none hover:from-green-600 hover:to-emerald-600 transform hover:scale-110 transition-all duration-300 shadow-lg"
            >
              {t("schemes")}
            </Button>
            <Button 
              onClick={() => navigate("/track-progress")} 
              variant="outline" 
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:from-purple-600 hover:to-pink-600 transform hover:scale-110 transition-all duration-300 shadow-lg"
            >
              {t("trackProgress")}
            </Button>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200 shadow-2xl animate-fade-in hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
            <CardHeader className="text-center">
              <CardTitle className="text-red-800 flex items-center justify-center gap-2 text-2xl">
                <Phone className="w-6 h-6 animate-pulse" />
                Emergency Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-red-700 mb-6 text-lg">
                For urgent issues, contact your District Collector directly
              </p>
              <Button 
                variant="destructive" 
                size="lg"
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 transform hover:scale-110 transition-all duration-300 shadow-lg text-lg px-8 py-3"
              >
                Emergency Helpline: 100
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 text-white py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <p className="text-gray-300 text-lg">
              © 2024 Government of Telangana. All rights reserved.
            </p>
            <p className="text-gray-400 mt-2">
              Connecting citizens with governance across all 33 districts
            </p>
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: 5 }, (_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot Toggle */}
      <ChatBotToggle />
    </div>
  );
};

export default Index;
