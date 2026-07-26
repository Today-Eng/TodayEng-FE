// react
import { Routes, Route, Navigate } from "react-router-dom";

// retrospect
import RetrospectSetup from "@/features/retrospect/pages/RetrospectSetup";
import RetrospectLoading from "@/features/retrospect/pages/RetrospectLoading";
import RetrospectSession from "@/features/retrospect/pages/RetrospectSession";
import RetrospectMemo from "@/features/retrospect/pages/RetrospectMemo";
import RetrospectComplete from "@/features/retrospect/pages/RetrospectComplete"


function App() {
  return (
     <Routes>
      <Route path="/" element={<Navigate to="/retrospect" replace />} />
      <Route path="/retrospect" element={<RetrospectSetup />} />
      <Route path="/retrospect-loading" element={<RetrospectLoading />} />
      <Route path="/retrospect-session" element={<RetrospectSession />} />
      <Route path="/retrospect-memo" element={<RetrospectMemo />} />
      <Route path="/retrospect-complete" element={<RetrospectComplete />} />
    </Routes>
  )
}

export default App;
