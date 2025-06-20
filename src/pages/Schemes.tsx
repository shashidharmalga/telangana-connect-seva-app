
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink, FileText, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Schemes = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const schemes = [
    {
      id: 1,
      name: "Rythu Bandhu",
      description: "Investment support scheme for farmers providing Rs. 10,000 per acre per season.",
      eligibility: "All farmers owning agricultural land",
      category: "Agriculture",
      status: "Active",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=200&fit=crop",
      officialUrl: "https://agriculture.telangana.gov.in/rythu-bandhu/",
      officer: "Agriculture Officer",
      color: "green"
    },
    {
      id: 2,
      name: "Dalit Bandhu",
      description: "Financial assistance of Rs. 10 lakh to each Dalit family for business or employment.",
      eligibility: "Scheduled Caste families",
      category: "Social Welfare",
      status: "Active",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=200&fit=crop",
      officialUrl: "https://dalitbandhu.telangana.gov.in/",
      officer: "Social Welfare Officer",
      color: "blue"
    },
    {
      id: 3,
      name: "Aasara Pension",
      description: "Monthly pension for elderly, widows, and disabled persons.",
      eligibility: "Age 65+ for elderly, widows, disabled persons",
      category: "Social Security",
      status: "Active",
      image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=400&h=200&fit=crop",
      officialUrl: "https://pensioner.telangana.gov.in/",
      officer: "Pension Officer",
      color: "purple"
    },
    {
      id: 4,
      name: "Mission Bhagiratha",
      description: "Safe drinking water supply to every household in rural and urban areas.",
      eligibility: "All households in Telangana",
      category: "Water Supply",
      status: "Ongoing",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=200&fit=crop",
      officialUrl: "https://missionbhagiratha.telangana.gov.in/",
      officer: "Water Supply Officer",
      color: "cyan"
    },
    {
      id: 5,
      name: "MCH Kit",
      description: "Essential items for newborn babies and mothers.",
      eligibility: "All pregnant women in government hospitals",
      category: "Healthcare",
      status: "Active",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=200&fit=crop",
      officialUrl: "https://health.telangana.gov.in/mch-kit/",
      officer: "Health Officer",
      color: "pink"
    },
    {
      id: 6,
      name: "Kalyana Lakshmi",
      description: "Financial assistance for marriages of SC, ST, BC, and minority girls.",
      eligibility: "Girls from SC/ST/BC/Minority families",
      category: "Social Welfare",
      status: "Active",
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=200&fit=crop",
      officialUrl: "https://kalyanalakshmi.telangana.gov.in/",
      officer: "Social Welfare Officer",
      color: "rose"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      green: {
        border: "border-green-500",
        bg: "bg-green-500",
        hover: "hover:bg-green-600",
        text: "text-green-600"
      },
      blue: {
        border: "border-blue-500",
        bg: "bg-blue-500",
        hover: "hover:bg-blue-600",
        text: "text-blue-600"
      },
      purple: {
        border: "border-purple-500",
        bg: "bg-purple-500",
        hover: "hover:bg-purple-600",
        text: "text-purple-600"
      },
      cyan: {
        border: "border-cyan-500",
        bg: "bg-cyan-500",
        hover: "hover:bg-cyan-600",
        text: "text-cyan-600"
      },
      pink: {
        border: "border-pink-500",
        bg: "bg-pink-500",
        hover: "hover:bg-pink-600",
        text: "text-pink-600"
      },
      rose: {
        border: "border-rose-500",
        bg: "bg-rose-500",
        hover: "hover:bg-rose-600",
        text: "text-rose-600"
      }
    };
    return colorMap[color] || colorMap.blue;
  };

  const filteredSchemes = schemes.filter(scheme =>
    scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scheme.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApplyNow = (url: string) => {
    window.open(url, '_blank');
  };

  const handleComplaint = (scheme: any) => {
    navigate('/report-issue', { 
      state: { 
        type: 'scheme',
        schemeName: scheme.name,
        officer: scheme.officer,
        category: 'Scheme Non-Delivery'
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50">
      <header className="bg-white shadow-sm border-b-4 border-yellow-500">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            ← Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Government Schemes</h1>
          <p className="text-gray-600">सरकारी योजनाएं | ప్రభుత్వ పథకాలు</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search schemes... योजना खोजें... పథకాలను వెతకండి..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-6 text-lg border-2 border-yellow-300 focus:border-yellow-500"
            />
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => {
            const colors = getColorClasses(scheme.color);
            return (
              <Card key={scheme.id} className={`hover:shadow-lg transition-shadow duration-300 border-l-4 ${colors.border}`}>
                <CardHeader>
                  <div className="w-full h-32 mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={scheme.image} 
                      alt={scheme.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-gray-800">{scheme.name}</CardTitle>
                    <Badge variant={scheme.status === 'Active' ? 'default' : 'secondary'}>
                      {scheme.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{scheme.description}</p>
                  
                  <div>
                    <h4 className="font-semibold text-sm text-gray-800 mb-1">Eligibility:</h4>
                    <p className="text-sm text-gray-600">{scheme.eligibility}</p>
                  </div>
                  
                  <div>
                    <Badge variant="outline" className="text-xs">
                      {scheme.category}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className={`flex-1 ${colors.bg} ${colors.hover}`}
                      onClick={() => handleApplyNow(scheme.officialUrl)}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Apply Now
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <FileText className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    className="w-full"
                    onClick={() => handleComplaint(scheme)}
                  >
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    File Complaint
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No schemes found matching your search.</p>
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Need Help?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-2">Contact Information</h4>
              <p className="text-gray-600">
                For scheme-related queries, contact your Village Panchayat Secretary or visit the nearest e-Seva center.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">Documents Required</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Aadhaar Card</li>
                <li>• Ration Card</li>
                <li>• Income Certificate</li>
                <li>• Bank Account Details</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schemes;
