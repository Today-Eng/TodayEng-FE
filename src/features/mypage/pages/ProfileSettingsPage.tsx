import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getMyPageProfile, updateProfile } from '@/features/mypage/api/mypageApi';
import BackHeaderLayout from '@/shared/components/BackHeaderLayout';
import CloseCircleIcon from '@/shared/components/icons/CloseCircleIcon';

const MAX_NICKNAME_LENGTH = 30;

export default function ProfileSettingsPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getMyPageProfile()
      .then((profile) => setNickname(profile.nickname))
      .catch((error: unknown) =>
        setErrorMessage(error instanceof Error ? error.message : '프로필을 불러오지 못했습니다.'),
      );
  }, []);

  const handleSave = async () => {
    const trimmedNickname = nickname.trim();

    if (!trimmedNickname) {
      return;
    }

    setIsSaving(true);
    setErrorMessage('');

    try {
      await updateProfile(trimmedNickname);
      navigate('/mypage');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '프로필 수정에 실패했습니다.');
      setIsSaving(false);
    }
  };

  return (
    <main className="relative min-h-dvh w-full bg-white text-black">
      <header className="relative">
        <BackHeaderLayout title="프로필 설정" />
        <button
          type="button"
          onClick={handleSave}
          disabled={!nickname.trim() || isSaving}
          className="absolute right-4 top-5 text-body font-semibold tracking-[-0.32px] text-main-500 disabled:text-grey-300"
        >
          수정
        </button>
      </header>

      <section className="mt-4 flex flex-col gap-4 px-4">
        <label htmlFor="profile-nickname" className="text-headline tracking-[-0.41px]">
          닉네임 입력
        </label>

        <div className="flex h-[52px] items-center gap-1 rounded-full border border-grey-800 bg-white px-4 py-[14px] focus-within:border-main-500">
          <input
            id="profile-nickname"
            type="text"
            value={nickname}
            maxLength={MAX_NICKNAME_LENGTH}
            onChange={(event) => setNickname(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-body tracking-[-0.41px] outline-none"
            placeholder="닉네임을 입력해주세요"
            autoComplete="nickname"
          />
          {nickname && (
            <button
              type="button"
              onClick={() => setNickname('')}
              className="flex size-6 shrink-0 items-center justify-center"
              aria-label="닉네임 지우기"
            >
              <CloseCircleIcon />
            </button>
          )}
        </div>
        {errorMessage && <p className="text-footnote text-error-500">{errorMessage}</p>}
      </section>
    </main>
  );
}
