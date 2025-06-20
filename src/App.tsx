
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ReportIssue from "./pages/ReportIssue";
import Schemes from "./pages/Schemes";
import TrackProgress from "./pages/TrackProgress";
import Login from "./pages/Login";
import OfficerDashboard from "./pages/OfficerDashboard";
import Escalate from "./pages/Escalate";
import MyReports from "./pages/MyReports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/report-issue" element={<ReportIssue />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/track-progress" element={<TrackProgress />} />
          <Route path="/my-reports" element={<MyReports />} />
          <Route path="/login" element={<Login />} />
          <Route path="/officer-dashboard" element={<OfficerDashboard />} />
          <Route path="/escalate" element={<Escalate />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
