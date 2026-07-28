import { Navigate, Route, Routes } from "react-router-dom";

// home
import HomePage from "@/features/home/pages/HomePage";

// retrospect
import RetrospectSetup from "@/features/retrospect/pages/RetrospectSetup";
import RetrospectLoading from "@/features/retrospect/pages/RetrospectLoading";
import RetrospectSession from "@/features/retrospect/pages/RetrospectSession";
import RetrospectMemo from "@/features/retrospect/pages/RetrospectMemo";
import RetrospectComplete from "@/features/retrospect/pages/RetrospectComplete";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route path="/home" element={<HomePage />} />

      <Route path="/retrospect">
        <Route index element={<RetrospectSetup />} />
        <Route path="loading" element={<RetrospectLoading />} />
        <Route path="session" element={<RetrospectSession />} />
        <Route path="memo" element={<RetrospectMemo />} />
        <Route path="complete" element={<RetrospectComplete />} />
      </Route>

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}