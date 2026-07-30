import { Navigate, Route, Routes } from "react-router-dom";

// home
import HomePage from "@/features/home/pages/HomePage";

// retrospect
import RetrospectSetup from "@/features/retrospect/create/pages/RetrospectSetup";
import RetrospectLoading from "@/features/retrospect/create/pages/RetrospectLoading";
import RetrospectSession from "@/features/retrospect/create/pages/RetrospectSession";
import RetrospectMemo from "@/features/retrospect/create/pages/RetrospectMemo";
import RetrospectComplete from "@/features/retrospect/create/pages/RetrospectComplete";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route path="/home" element={<HomePage />} />

      <Route
        path="/retrospect"
        element={<RetrospectSetup />}
      />
      <Route
        path="/retrospect-loading"
        element={<RetrospectLoading />}
      />
      <Route
        path="/retrospect-session"
        element={<RetrospectSession />}
      />
      <Route
        path="/retrospect-memo"
        element={<RetrospectMemo />}
      />
      <Route
        path="/retrospect-complete"
        element={<RetrospectComplete />}
      />

      <Route
        path="*"
        element={<Navigate to="/home" replace />}
      />
    </Routes>
  );
}