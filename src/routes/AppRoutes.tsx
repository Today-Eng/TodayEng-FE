import { Navigate, Route, Routes } from 'react-router-dom';

// auth
import EnglishLevelSetupPage from '@/features/auth/pages/EnglishLevelSetupPage';
import InterestSetupPage from '@/features/auth/pages/InterestSetupPage';
import LoginPage from '@/features/auth/pages/LoginPage';
import NicknameSetupPage from '@/features/auth/pages/NicknameSetupPage';
import OnboardingCompletePage from '@/features/auth/pages/OnboardingCompletePage';
import TermsAgreementPage from '@/features/auth/pages/TermsAgreementPage';
import { hasCompletedOnboarding, isAuthenticated } from '@/features/auth/session';

// home
import HomePage from '@/features/home/pages/HomePage';

// mypage
import MyPage from '@/features/mypage/pages/MyPage';
import ProfileSettingsPage from '@/features/mypage/pages/ProfileSettingsPage';
import LearningSettingsPage from '@/features/mypage/pages/LearningSettingsPage';
import InterestSettingsPage from '@/features/mypage/pages/InterestSettingsPage';
import IntegrationSettingsPage from '@/features/mypage/pages/IntegrationSettingsPage';

// retrospect
import RetrospectSetup from '@/features/retrospect/create/pages/RetrospectSetup';
import RetrospectLoading from '@/features/retrospect/create/pages/RetrospectLoading';
import RetrospectSession from '@/features/retrospect/create/pages/RetrospectSession';
import RetrospectMemo from '@/features/retrospect/create/pages/RetrospectMemo';
import RetrospectComplete from '@/features/retrospect/create/pages/RetrospectComplete';

// retrospects
import RetrospectList from '@/features/retrospect/record/pages/RetrospectList';
import RetrospectDetail from '@/features/retrospect/detail/pages/RetrospectDetail';
import RetrospectMemoEdit from '@/features/retrospect/detail/pages/RetrospectMemoEdit';

function EntryRoute() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={hasCompletedOnboarding() ? '/home' : '/onboarding/nickname'} replace />;
}

function LoginRoute() {
  return isAuthenticated() ? <EntryRoute /> : <LoginPage />;
}

function OnboardingRoute({ children }: { children: React.ReactNode }) {
  return hasCompletedOnboarding() ? <Navigate to="/home" replace /> : children;
}

function MemberRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return hasCompletedOnboarding() ? children : <Navigate to="/onboarding/nickname" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<EntryRoute />} />

      <Route path="/login" element={<LoginRoute />} />
      <Route
        path="/onboarding/nickname"
        element={
          <OnboardingRoute>
            <NicknameSetupPage />
          </OnboardingRoute>
        }
      />
      <Route
        path="/onboarding/english-level"
        element={
          <OnboardingRoute>
            <EnglishLevelSetupPage />
          </OnboardingRoute>
        }
      />
      <Route
        path="/onboarding/interests"
        element={
          <OnboardingRoute>
            <InterestSetupPage />
          </OnboardingRoute>
        }
      />
      <Route
        path="/onboarding/terms"
        element={
          <OnboardingRoute>
            <TermsAgreementPage />
          </OnboardingRoute>
        }
      />
      <Route
        path="/onboarding/complete"
        element={
          <OnboardingRoute>
            <OnboardingCompletePage />
          </OnboardingRoute>
        }
      />

      <Route
        path="/home"
        element={
          <>
            <HomePage />
          </>
        }
      />

      <Route
        path="/retrospect/:diaryId"
        element={
          <MemberRoute>
            <RetrospectSetup />
          </MemberRoute>
        }
      />

      <Route
        path="/retrospect/:diaryId/loading"
        element={
          <MemberRoute>
            <RetrospectLoading />
          </MemberRoute>
        }
      />

      <Route
        path="/retrospect/:diaryId/session"
        element={
          <MemberRoute>
            <RetrospectSession />
          </MemberRoute>
        }
      />

      <Route
        path="/retrospect/:diaryId/memo"
        element={
          <MemberRoute>
            <RetrospectMemo />
          </MemberRoute>
        }
      />

      <Route
        path="/retrospect/:diaryId/complete"
        element={
          <MemberRoute>
            <RetrospectComplete />
          </MemberRoute>
        }
      />

      <Route
        path="/retrospects"
        element={
          <MemberRoute>
            <RetrospectList />
          </MemberRoute>
        }
      />
      <Route
        path="/retrospects/:diaryId"
        element={
          <MemberRoute>
            <RetrospectDetail />
          </MemberRoute>
        }
      />
      <Route
        path="/retrospects/:diaryId/memo/edit"
        element={
          <MemberRoute>
            <RetrospectMemoEdit />
          </MemberRoute>
        }
      />

      <Route
        path="/mypage"
        element={
          <MemberRoute>
            <MyPage />
          </MemberRoute>
        }
      />
      <Route
        path="/mypage/profile"
        element={
          <MemberRoute>
            <ProfileSettingsPage />
          </MemberRoute>
        }
      />
      <Route
        path="/mypage/learning"
        element={
          <MemberRoute>
            <LearningSettingsPage />
          </MemberRoute>
        }
      />
      <Route
        path="/mypage/interests"
        element={
          <MemberRoute>
            <InterestSettingsPage />
          </MemberRoute>
        }
      />
      <Route
        path="/mypage/integrations"
        element={
          <MemberRoute>
            <IntegrationSettingsPage />
          </MemberRoute>
        }
      />

      <Route path="*" element={<EntryRoute />} />
    </Routes>
  );
}
