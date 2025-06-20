
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [govField, setGovField] = useState("");
  const navigate = useNavigate();

  const govFields = [
    "District Panchayath Officer",
    "MRO (Mandal Revenue Officer)",
    "Irrigation Officer", 
    "Tahsildar",
    "District Revenue Officer",
    "DEO (District Education Officer)",
    "Additional Collector",
    "District Collector"
  ];

  const handleLogin = () => {
    if (employeeId && password && govField) {
      // Store officer info in localStorage for demo
      localStorage.setItem('officerData', JSON.stringify({
        employeeId,
        govField,
        isOfficer: true
      }));
      navigate('/officer-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 relative overflow-hidden">
      {/* Telangana Government Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMjAgMjBMMjAgMEwwIDIweiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] repeat"></div>
      </div>

      {/* Government Seal */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center opacity-20">
        <Shield className="w-12 h-12 text-red-600" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md shadow-2xl border-4 border-yellow-400">
          <CardHeader className="text-center bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-t-lg">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Government Officer Login</CardTitle>
            <p className="text-yellow-100">Telangana Connect Official Portal</p>
          </CardHeader>
          
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employeeId" className="text-gray-700 font-semibold">
                Employee ID
              </Label>
              <Input
                id="employeeId"
                type="text"
                placeholder="Enter your Employee ID"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="border-2 border-gray-300 focus:border-red-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-semibold">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 border-gray-300 focus:border-red-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="govField" className="text-gray-700 font-semibold">
                Government Field
              </Label>
              <Select value={govField} onValueChange={setGovField}>
                <SelectTrigger className="border-2 border-gray-300 focus:border-red-500">
                  <SelectValue placeholder="Select your department" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {govFields.map((field) => (
                    <SelectItem key={field} value={field}>
                      {field}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleLogin}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold"
              disabled={!employeeId || !password || !govField}
            >
              <Shield className="w-5 h-5 mr-2" />
              Login to Dashboard
            </Button>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Official portal for Telangana Government Officers
              </p>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="text-red-600 hover:text-red-700 mt-2"
              >
                ← Back to Public Portal
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
