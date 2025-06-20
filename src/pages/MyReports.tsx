
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Report {
  id: string;
  district: string;
  village: string;
  issueType: string;
  officer: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  submittedDate: string;
}

const MyReports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load reports from localStorage
    const savedReports = localStorage.getItem('userReports');
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    }
  }, []);

  const filteredReports = reports.filter(report =>
    report.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.issueType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="w-4 h-4" />;
      case "In Progress": return <Clock className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-500";
      case "In Progress": return "bg-blue-500";
      default: return "bg-yellow-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "border-red-500 text-red-600";
      case "Medium": return "border-yellow-500 text-yellow-600";
      default: return "border-green-500 text-green-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      <header className="bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4 text-white hover:bg-white hover:text-red-600"
          >
            ← Back to Home
          </Button>
          <div className="flex items-center gap-4">
            <FileText className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">My Reports</h1>
              <p className="text-yellow-100">मेरी रिपोर्ट्स | నా నివేదికలు</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Stats */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search reports by district, village, or issue type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              onClick={() => navigate('/report-issue')}
              className="bg-red-500 hover:bg-red-600"
            >
              Submit New Report
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="border-l-4 border-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">{reports.length}</p>
                    <p className="text-sm text-gray-600">Total Reports</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-yellow-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold">
                      {reports.filter(r => r.status === "Pending").length}
                    </p>
                    <p className="text-sm text-gray-600">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-blue-600">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">
                      {reports.filter(r => r.status === "In Progress").length}
                    </p>
                    <p className="text-sm text-gray-600">In Progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-green-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">
                      {reports.filter(r => r.status === "Completed").length}
                    </p>
                    <p className="text-sm text-gray-600">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reports List */}
        {filteredReports.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Reports Found</h3>
              <p className="text-gray-500 mb-4">
                {reports.length === 0 
                  ? "You haven't submitted any reports yet." 
                  : "No reports match your search criteria."}
              </p>
              <Button 
                onClick={() => navigate('/report-issue')}
                className="bg-red-500 hover:bg-red-600"
              >
                Submit Your First Report
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-blue-600">
                          Report #{report.id}
                        </h3>
                        <Badge 
                          className={`${getStatusColor(report.status)} text-white`}
                        >
                          {getStatusIcon(report.status)}
                          <span className="ml-1">{report.status}</span>
                        </Badge>
                        <Badge 
                          variant="outline"
                          className={getPriorityColor(report.priority)}
                        >
                          {report.priority} Priority
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><span className="font-medium">District:</span> {report.district}</p>
                          <p><span className="font-medium">Village:</span> {report.village}</p>
                          <p><span className="font-medium">Issue Type:</span> {report.issueType}</p>
                        </div>
                        <div>
                          <p><span className="font-medium">Officer:</span> {report.officer}</p>
                          <p><span className="font-medium">Submitted:</span> {report.submittedDate}</p>
                        </div>
                      </div>
                      
                      <p className="mt-3 text-gray-600">
                        <span className="font-medium">Description:</span> {report.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {report.status === "Pending" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate('/escalate')}
                          className="text-orange-600 border-orange-300 hover:bg-orange-50"
                        >
                          Escalate
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReports;
