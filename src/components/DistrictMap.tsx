
import { Card } from "@/components/ui/card";

export const DistrictMap = () => {
  return (
    <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 max-w-md mx-auto">
      <div className="text-center space-y-4">
        <div className="w-64 h-48 mx-auto bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 rounded-lg flex items-center justify-center relative overflow-hidden">
          {/* Stylized Telangana Map */}
          <div className="absolute inset-4 bg-white/20 rounded-lg backdrop-blur-sm"></div>
          <div className="relative z-10 text-white text-center">
            <div className="text-2xl font-bold mb-2">తెలంగాణ</div>
            <div className="text-sm">33 Districts</div>
            <div className="flex justify-center mt-2 space-x-1">
              {/* District dots */}
              {Array.from({ length: 33 }, (_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 bg-white rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              )).slice(0, 15)}
            </div>
            <div className="flex justify-center space-x-1">
              {Array.from({ length: 33 }, (_, i) => (
                <div
                  key={i + 15}
                  className="w-1 h-1 bg-white rounded-full animate-pulse"
                  style={{ animationDelay: `${(i + 15) * 0.1}s` }}
                ></div>
              )).slice(0, 18)}
            </div>
          </div>
          
          {/* Bathukamma pattern */}
          <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-yellow-400/30 animate-pulse"></div>
          <div className="absolute bottom-2 left-2 w-6 h-6 rounded-full bg-orange-400/30 animate-pulse"></div>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800">Interactive District Map</h3>
          <p className="text-sm text-gray-600">Click on any district to get started</p>
        </div>
      </div>
    </Card>
  );
};
