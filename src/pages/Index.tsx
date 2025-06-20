
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, TrendingUp, Building, AlertTriangle, User, Phone } from "lucide-react";
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
      color: "bg-blue-500"
    },
    {
      icon: TrendingUp,
      titleKey: "trackProgress",
      descriptionKey: "trackStatus",
      action: () => navigate("/track-progress"),
      color: "bg-green-500"
    },
    {
      icon: Building,
      titleKey: "schemes",
      descriptionKey: "viewSchemes",
      action: () => navigate("/schemes"),
      color: "bg-purple-500"
    },
    {
      icon: AlertTriangle,
      titleKey: "escalate",
      descriptionKey: "escalateIssue",
      action: () => navigate("/escalate"),
      color: "bg-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
                <p className="text-sm text-gray-600">{t("subtitle")}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <Button 
                variant="outline" 
                onClick={() => navigate("/login")}
                className="flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                {t("officerLogin")}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t("subtitle")} - Connect with your government across all 33 districts of Telangana
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={feature.action}>
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{t(feature.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {t(feature.descriptionKey)}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-center mb-8">Quick Actions</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={() => navigate("/my-reports")} variant="outline" size="lg">
              My Reports
            </Button>
            <Button onClick={() => navigate("/schemes")} variant="outline" size="lg">
              {t("schemes")}
            </Button>
            <Button onClick={() => navigate("/track-progress")} variant="outline" size="lg">
              {t("trackProgress")}
            </Button>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-red-50 border-red-200">
            <CardHeader className="text-center">
              <CardTitle className="text-red-800 flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                Emergency Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-red-700 mb-4">
                For urgent issues, contact your District Collector directly
              </p>
              <Button variant="destructive" size="lg">
                Emergency Helpline: 100
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-300">
              © 2024 Government of Telangana. All rights reserved.
            </p>
            <p className="text-gray-400 mt-2">
              Connecting citizens with governance across all 33 districts
            </p>
          </div>
        </div>
      </footer>

      {/* Chatbot Toggle */}
      <ChatBotToggle />
    </div>
  );
};

export default Index;
