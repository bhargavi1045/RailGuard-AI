import { Routes, Route } from "react-router-dom";
import AuthPage from "./AuthPage";
import Dashboard from "./Dashboard";
import DashboardTrainDriver from "./DashboardTrainDriver";
import Alerts from "./AlertsAuthority";
import Profile from "./Profile";
import ProfileDriver from "./ProfileDriver";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard-train-driver" element={<DashboardTrainDriver />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/profiledriver'element={<ProfileDriver />} />
    </Routes>
  );
}
