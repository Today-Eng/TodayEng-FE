import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { logout } from '@/features/auth/api';
import { clearSession } from '@/features/auth/session';
import {
  deleteAccount,
  getMyPageProfile,
  type MyPageProfile,
} from '@/features/mypage/api/mypageApi';
import MyPageMenuItem from '@/features/mypage/components/MyPageMenuItem';
import NotificationSetting from '@/features/mypage/components/NotificationSetting';
import ProfileSummary from '@/features/mypage/components/ProfileSummary';
import BottomNav from '@/shared/components/BottomNav';
import Modal from '@/shared/components/Modal';

export default function MyPage() {
  const navigate = useNavigate();
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [profile, setProfile] = useState<MyPageProfile | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);

  useEffect(() => {
    let isActive = true;

    getMyPageProfile()
      .then((data) => {
        if (isActive) setProfile(data);
      })
      .catch((error: unknown) => {
        if (isActive) {
          setErrorMessage(
            error instanceof Error ? error.message : '내 정보를 불러오지 못했습니다.',
          );
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    setErrorMessage('');

    try {
      await logout();
    } catch {
      // 서버의 토큰 폐기 실패 여부와 관계없이 기기의 로그인 정보는 제거합니다.
    } finally {
      clearSession();
      navigate('/login', { replace: true });
    }
  };

  const handleDeleteAccount = async () => {
    if (isDeletingAccount) return;

    setIsDeletingAccount(true);
    setErrorMessage('');

    try {
      await deleteAccount();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '계정 삭제에 실패했습니다.');
      setIsDeletingAccount(false);
      return;
    }

    clearSession();
    navigate('/login', { replace: true });
  };

  return (
    <main className="min-h-screen bg-white pb-[75px]">
      <div className="w-full">
        <header className="flex h-[130px] items-end px-4 pb-5">
          <h1 className="text-title2 font-semibold tracking-[0.35px] text-black">마이페이지</h1>
        </header>

        {profile ? (
          <ProfileSummary
            nickname={profile.nickname}
            profileUrl={profile.profileUrl}
            englishLevel={profile.englishLevel}
            email={profile.email}
          />
        ) : (
          <div className="flex h-[70px] items-center px-4 text-body text-grey-500">
            {errorMessage || '내 정보를 불러오는 중입니다.'}
          </div>
        )}
        {profile && errorMessage && (
          <p className="px-4 pb-3 text-footnote text-error-500">{errorMessage}</p>
        )}

        <div className="h-2 bg-grey-50 opacity-80" />

        <section aria-label="마이페이지 설정">
          <MyPageMenuItem label="프로필 설정" onClick={() => navigate('/mypage/profile')} />
          <NotificationSetting
            enabled={notificationEnabled}
            onToggle={() => setNotificationEnabled((enabled) => !enabled)}
          />
          <MyPageMenuItem label="학습 설정" onClick={() => navigate('/mypage/learning')} />
          <MyPageMenuItem label="관심사 설정" onClick={() => navigate('/mypage/interests')} />
          <MyPageMenuItem label="연동 관리" onClick={() => navigate('/mypage/integrations')} />
        </section>

        <div className="h-2 bg-grey-50 opacity-80" />

        <section aria-label="계정 관리">
          <MyPageMenuItem
            label="로그아웃"
            showArrow={false}
            onClick={() => setIsLogoutModalOpen(true)}
          />
          <MyPageMenuItem
            label="계정 삭제"
            tone="danger"
            showArrow={false}
            onClick={() => setIsDeleteAccountModalOpen(true)}
          />
        </section>

        <BottomNav />
      </div>

      {isLogoutModalOpen && (
        <Modal
          mainText="로그아웃을 하시겠습니까?"
          subText="다시 로그인할 수 있어요"
          leftButtonText="취소"
          rightButtonText={isLoggingOut ? '로그아웃 중...' : '로그아웃'}
          onLeftClick={() => {
            if (!isLoggingOut) setIsLogoutModalOpen(false);
          }}
          onRightClick={handleLogout}
        />
      )}

      {isDeleteAccountModalOpen && (
        <Modal
          mainText="계정 삭제를 하시겠습니까?"
          subText={'탈퇴하면 모든 데이터가 삭제되며\n복구할 수 없어요.'}
          leftButtonText="취소"
          rightButtonText={isDeletingAccount ? '삭제 중...' : '계정 삭제'}
          onLeftClick={() => {
            if (!isDeletingAccount) setIsDeleteAccountModalOpen(false);
          }}
          onRightClick={handleDeleteAccount}
        />
      )}
    </main>
  );
}
