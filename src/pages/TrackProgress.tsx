
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Clock, CheckCircle, AlertCircle, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TrackProgress = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDistrict, setFilterDistrict] = useState("all");

  // Mock data for complaints
  const complaints = [
    {
      id: "TG2024001",
      district: "Warangal Urban",
      village: "Kazipet",
      issueType: "Roads & Infrastructure",
      officer: "PWD Officer",
      status: "In Progress",
      submittedDate: "2024-01-15",
      lastUpdate: "2024-01-18",
      description: "Potholes on main road causing traffic issues",
      evidence: ["photo1.jpg", "video1.mp4"]
    },
    {
      id: "TG2024002",
      district: "Medak",
      village: "Gajwel",
      issueType: "Water Supply",
      officer: "Village Panchayat Secretary",
      status: "Completed",
      submittedDate: "2024-01-10",
      lastUpdate: "2024-01-16",
      description: "Water shortage in locality",
      evidence: ["photo2.jpg"]
    },
    {
      id: "TG2024003",
      district: "Hyderabad",
      village: "Jubilee Hills",
      issueType: "Electricity",
      officer: "Mandal Officer",
      status: "Pending",
      submittedDate: "2024-01-20",
      lastUpdate: "2024-01-20",
      description: "Frequent power cuts in residential area",
      evidence: ["video2.mp4", "document1.pdf"]
    },
    {
      id: "TG2024004",
      district: "Nizamabad",
      village: "Bodhan",
      issueType: "Healthcare",
      officer: "District Collector",
      status: "Escalated",
      submittedDate: "2024-01-12",
      lastUpdate: "2024-01-19",
      description: "Lack of medicines in primary health center",
      evidence: ["photo3.jpg", "photo4.jpg"]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "In Progress":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "Escalated":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Escalated":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.issueType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || complaint.status === filterStatus;
    const matchesDistrict = filterDistrict === "all" || complaint.district === filterDistrict;
    
    return matchesSearch && matchesStatus && matchesDistrict;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="bg-white shadow-sm border-b-4 border-green-500">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            ← Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Track Progress</h1>
          <p className="text-gray-600">प्रगति ट्रैक करें | పురోగతిని ట్రాక్ చేయండి</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8 border-l-4 border-green-500">
          <CardHeader>
            <CardTitle>Filter Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search by ID or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Escalated">Escalated</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterDistrict} onValueChange={setFilterDistrict}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                  <SelectItem value="Warangal Urban">Warangal Urban</SelectItem>
                  <SelectItem value="Medak">Medak</SelectItem>
                  <SelectItem value="Nizamabad">Nizamabad</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Complaints List */}
        <div className="space-y-6">
          {filteredComplaints.map((complaint) => (
            <Card key={complaint.id} className="hover:shadow-lg transition-shadow duration-300 animate-slide-in-right">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(complaint.status)}
                    <div>
                      <CardTitle className="text-lg">Complaint #{complaint.id}</CardTitle>
                      <p className="text-sm text-gray-600">{complaint.district} - {complaint.village}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(complaint.status)}>
                    {complaint.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-800">Issue Type</h4>
                      <p className="text-sm text-gray-600">{complaint.issueType}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-800">Assigned Officer</h4>
                      <p className="text-sm text-gray-600">{complaint.officer}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-800">Description</h4>
                      <p className="text-sm text-gray-600">{complaint.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-800">Timeline</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Submitted:</span>
                          <span>{complaint.submittedDate}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Last Update:</span>
                          <span>{complaint.lastUpdate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm text-gray-800 mb-2">Evidence Files</h4>
                      <div className="flex flex-wrap gap-2">
                        {complaint.evidence.map((file, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <FileText className="w-3 h-3 mr-1" />
                            {file}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Progress Timeline */}
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-semibold text-sm text-gray-800 mb-3">Progress Timeline</h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="ml-2 text-xs text-gray-600">Submitted</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-gray-200"></div>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        complaint.status === 'In Progress' || complaint.status === 'Completed' || complaint.status === 'Escalated' 
                          ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      <span className="ml-2 text-xs text-gray-600">In Progress</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-gray-200"></div>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        complaint.status === 'Completed' ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      <span className="ml-2 text-xs text-gray-600">Completed</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredComplaints.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No complaints found matching your criteria.</p>
            <Button 
              className="mt-4 bg-green-500 hover:bg-green-600"
              onClick={() => navigate('/report-issue')}
            >
              Submit Your First Complaint
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackProgress;
