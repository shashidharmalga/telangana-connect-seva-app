
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, AlertTriangle, CheckCircle, Clock, FileText, LogOut, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ComplaintDetailsModal from "@/components/ComplaintDetailsModal";

const OfficerDashboard = () => {
  const [officerData, setOfficerData] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [complaints, setComplaints] = useState<any[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem('officerData');
    if (stored) {
      setOfficerData(JSON.parse(stored));
    } else {
      navigate('/login');
    }

    // Load complaints from localStorage
    const storedComplaints = localStorage.getItem('officerComplaints');
    if (storedComplaints) {
      setComplaints(JSON.parse(storedComplaints));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('officerData');
    navigate('/');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleViewDetails = (complaint: any) => {
    setSelectedComplaint(complaint);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = (complaintId: string, newStatus: string) => {
    const updatedComplaints = complaints.map(complaint => 
      complaint.id === complaintId 
        ? { ...complaint, status: newStatus }
        : complaint
    );
    
    setComplaints(updatedComplaints);
    localStorage.setItem('officerComplaints', JSON.stringify(updatedComplaints));
    
    // Also update user reports
    const userReports = JSON.parse(localStorage.getItem('userReports') || '[]');
    const updatedUserReports = userReports.map((report: any) => 
      report.id === complaintId 
        ? { ...report, status: newStatus }
        : report
    );
    localStorage.setItem('userReports', JSON.stringify(updatedUserReports));
    
    toast({
      title: "Status Updated",
      description: `Complaint ${complaintId} status changed to ${newStatus}`,
    });
  };

  const districts = [
    "Hyderabad", "Warangal Urban", "Warangal Rural", "Medak", "Nizamabad", "Karimnagar",
    "Khammam", "Nalgonda", "Mahbubnagar", "Rangareddy", "Adilabad", "Mancherial"
  ];

  // Calculate stats from actual complaints
  const totalComplaints = complaints.length;
  const pendingComplaints = complaints.filter(c => c.status === "Pending").length;
  const inProgressComplaints = complaints.filter(c => c.status === "In Progress").length;
  const completedComplaints = complaints.filter(c => c.status === "Completed").length;

  // Generate heat map data from actual complaints
  const heatMapData = districts.map(district => {
    const districtComplaints = complaints.filter(c => c.district === district);
    const resolved = districtComplaints.filter(c => c.status === "Completed").length;
    return {
      district,
      complaints: districtComplaints.length,
      resolved
    };
  }).filter(item => item.complaints > 0);

  if (!officerData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                onClick={handleBackToHome}
                variant="outline" 
                className="text-red-600 border-white hover:bg-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Officer Dashboard</h1>
                <p className="text-yellow-100">DigiPanchayath - Government Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold">{officerData.govField}</p>
                <p className="text-sm text-yellow-100">ID: {officerData.employeeId}</p>
              </div>
              <Button onClick={handleLogout} variant="outline" className="text-red-600 border-white hover:bg-white">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-red-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <AlertTriangle className="w-8 h-8 text-red-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">{totalComplaints}</p>
                  <p className="text-gray-600">Total Complaints</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-yellow-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Clock className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">{pendingComplaints}</p>
                  <p className="text-gray-600">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <FileText className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">{inProgressComplaints}</p>
                  <p className="text-gray-600">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-green-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">{completedComplaints}</p>
                  <p className="text-gray-600">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Complaint Heat Map */}
        {heatMapData.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">District-wise Complaint Heat Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {heatMapData.map((item) => (
                  <div key={item.district} className="bg-gradient-to-br from-red-100 to-orange-100 p-4 rounded-lg border-2 border-red-200">
                    <h3 className="font-semibold text-gray-800 mb-2">{item.district}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Complaints:</span>
                        <span className="font-bold text-red-600">{item.complaints}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Resolved:</span>
                        <span className="font-bold text-green-600">{item.resolved}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{width: `${item.complaints > 0 ? (item.resolved / item.complaints) * 100 : 0}%`}}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Complaints */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-gray-800">Recent Complaints</CardTitle>
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  {districts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {complaints.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No complaints submitted yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left p-3 font-semibold text-gray-700">Complaint ID</th>
                      <th className="text-left p-3 font-semibold text-gray-700">District</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Village</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Issue Type</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Status</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Priority</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints
                      .filter(complaint => selectedDistrict === "all" || complaint.district === selectedDistrict)
                      .map((complaint) => (
                      <tr key={complaint.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-3 font-medium text-blue-600">{complaint.id}</td>
                        <td className="p-3">{complaint.district}</td>
                        <td className="p-3">{complaint.village}</td>
                        <td className="p-3">{complaint.issueType}</td>
                        <td className="p-3">
                          <Badge 
                            variant={complaint.status === 'Completed' ? 'default' : 'secondary'}
                            className={`${complaint.status === 'Completed' ? 'bg-green-500' : 
                                        complaint.status === 'In Progress' ? 'bg-blue-500' : 'bg-yellow-500'}`}
                          >
                            {complaint.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge 
                            variant="outline"
                            className={`${complaint.priority === 'High' ? 'border-red-500 text-red-600' : 
                                        complaint.priority === 'Medium' ? 'border-yellow-500 text-yellow-600' : 
                                        'border-green-500 text-green-600'}`}
                          >
                            {complaint.priority}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Button 
                            size="sm" 
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => handleViewDetails(complaint)}
                          >
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Complaint Details Modal */}
      <ComplaintDetailsModal
        complaint={selectedComplaint}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
};

export default OfficerDashboard;
