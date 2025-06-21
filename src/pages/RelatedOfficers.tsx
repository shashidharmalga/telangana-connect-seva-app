
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, User, Phone, Mail, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const RelatedOfficers = () => {
  const { t } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const districts = [
    "Hyderabad", "Warangal Urban", "Warangal Rural", "Medak", "Nizamabad", "Karimnagar",
    "Khammam", "Nalgonda", "Mahbubnagar", "Rangareddy", "Adilabad", "Mancherial"
  ];

  const officers = [
    {
      id: 1,
      name: "Mr. Rajesh Kumar",
      designation: "Tahsildar",
      district: "Hyderabad",
      phone: "+91 9876543210",
      email: "tahsildar.hyd@telangana.gov.in",
      office: "Tahsildar Office, Hyderabad"
    },
    {
      id: 2,
      name: "Ms. Priya Sharma",
      designation: "MRO",
      district: "Hyderabad", 
      phone: "+91 9876543211",
      email: "mro.hyd@telangana.gov.in",
      office: "MRO Office, Hyderabad"
    },
    {
      id: 3,
      name: "Dr. Suresh Reddy",
      designation: "Additional Collector",
      district: "Hyderabad",
      phone: "+91 9876543212",
      email: "addl.collector.hyd@telangana.gov.in",
      office: "Collectorate, Hyderabad"
    },
    {
      id: 4,
      name: "Mr. Venkat Rao",
      designation: "Irrigation Officer",
      district: "Hyderabad",
      phone: "+91 9876543213",
      email: "irrigation.hyd@telangana.gov.in",
      office: "Irrigation Department, Hyderabad"
    },
    {
      id: 5,
      name: "Dr. Lakshmi Devi",
      designation: "Health Officer",
      district: "Hyderabad",
      phone: "+91 9876543214",
      email: "health.hyd@telangana.gov.in",
      office: "Health Department, Hyderabad"
    },
    {
      id: 6,
      name: "Mr. Krishna Murthy",
      designation: "District Panchayath Officer",
      district: "Hyderabad",
      phone: "+91 9876543215",
      email: "dpo.hyd@telangana.gov.in",
      office: "District Panchayath Office, Hyderabad"
    },
    // Warangal Urban officers
    {
      id: 7,
      name: "Mr. Ravi Teja",
      designation: "Tahsildar",
      district: "Warangal Urban",
      phone: "+91 9876543216",
      email: "tahsildar.wgl@telangana.gov.in",
      office: "Tahsildar Office, Warangal"
    },
    {
      id: 8,
      name: "Ms. Sowmya Reddy",
      designation: "MRO",
      district: "Warangal Urban",
      phone: "+91 9876543217",
      email: "mro.wgl@telangana.gov.in",
      office: "MRO Office, Warangal"
    },
    {
      id: 9,
      name: "Mr. Naresh Kumar",
      designation: "Additional Collector",
      district: "Warangal Urban",
      phone: "+91 9876543218",
      email: "addl.collector.wgl@telangana.gov.in",
      office: "Collectorate, Warangal"
    },
    {
      id: 10,
      name: "Ms. Kavitha Rani",
      designation: "Irrigation Officer",
      district: "Warangal Urban",
      phone: "+91 9876543219",
      email: "irrigation.wgl@telangana.gov.in",
      office: "Irrigation Department, Warangal"
    },
    {
      id: 11,
      name: "Dr. Ramesh Babu",
      designation: "Health Officer",
      district: "Warangal Urban",
      phone: "+91 9876543220",
      email: "health.wgl@telangana.gov.in",
      office: "Health Department, Warangal"
    },
    {
      id: 12,
      name: "Mr. Srinivas Rao",
      designation: "District Panchayath Officer",
      district: "Warangal Urban",
      phone: "+91 9876543221",
      email: "dpo.wgl@telangana.gov.in",
      office: "District Panchayath Office, Warangal"
    }
  ];

  const filteredOfficers = officers.filter(officer => {
    const matchesDistrict = !selectedDistrict || officer.district === selectedDistrict;
    const matchesSearch = !searchTerm || 
      officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.designation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDistrict && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/report-issue')}
              variant="ghost"
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t("backToReportIssue") || "Back to Report Issue"}
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{t("relatedOfficers") || "Related Officers"}</h1>
              <p className="text-blue-100">{t("contactGovernmentOfficers") || "Contact Government Officers"}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-6 flex gap-4 flex-wrap">
          <div className="flex-1 min-w-64">
            <Input
              placeholder={t("searchOfficers") || "Search officers by name or designation..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-2 border-gray-300 focus:border-blue-500"
            />
          </div>
          <div className="min-w-48">
            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger className="border-2 border-gray-300 focus:border-blue-500">
                <SelectValue placeholder={t("selectDistrict") || "Select District"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t("allDistricts") || "All Districts"}</SelectItem>
                {districts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Officers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOfficers.map((officer) => (
            <Card key={officer.id} className="border-2 border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <CardTitle className="text-lg flex items-center gap-3">
                  <User className="w-6 h-6" />
                  {officer.name}
                </CardTitle>
                <p className="text-blue-100 font-medium">{officer.designation}</p>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{officer.district}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${officer.phone}`} className="text-sm hover:text-blue-600">
                    {officer.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${officer.email}`} className="text-sm hover:text-blue-600 break-all">
                    {officer.email}
                  </a>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  <strong>{t("office") || "Office"}:</strong> {officer.office}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOfficers.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              {t("noOfficersFound") || "No Officers Found"}
            </h3>
            <p className="text-gray-500">
              {t("tryDifferentSearch") || "Try adjusting your search criteria"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedOfficers;
