import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import BackHeader from '@/shared/components/BackHeaderLayout';

import { useUpdateRetrospectMemoMutation } from '@/features/retrospect/detail/queries';

interface MemoEditLocationState {
  memo?: string;
}

export default function RetrospectMemoEditPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { diaryId } = useParams();

  const parsedDiaryId = Number(diaryId);

  const locationState = location.state as MemoEditLocationState | null;

  const initialMemo = locationState?.memo ?? '';

  const [memo, setMemo] = useState(initialMemo);
  const [memoError, setMemoError] = useState('');

  const { mutateAsync: updateMemo, isPending: isSaving } =
    useUpdateRetrospectMemoMutation(parsedDiaryId);

  const isChanged = memo.trim() !== initialMemo.trim();

  const canSave = isChanged && !isSaving;

  const handleBack = () => {
    if (isSaving) {
      return;
    }

    navigate(-1);
  };

  const handleSave = async () => {
    if (!canSave || !Number.isFinite(parsedDiaryId)) {
      return;
    }

    try {
      await updateMemo(memo.trim());

      navigate(-1);
    } catch {
      setMemoError('메모 수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="min-h-dvh bg-white">
      <main
        className="
          min-h-dvh
          w-full
          pt-[calc(68px+var(--sat))]
        "
      >
        <BackHeader
          title="메모 수정하기"
          onBack={handleBack}
          rightAction={{
            type: 'confirm',
            onClick: handleSave,
            disabled: !canSave,
          }}
        />

        <section className="mt-4 px-4">
          <textarea
            value={memo}
            onChange={(event) => {
              setMemo(event.target.value);
            }}
            placeholder="나눈 대화에 대해서 느낀 점을 자유롭게 적어주세요"
            maxLength={1000}
            className="
              h-[660px]
              w-full
              resize-none
              rounded-[24px]
              border
              border-grey-200
              bg-white
              px-4
              py-4
              text-body
              font-normal
              text-black
              outline-none
              placeholder:text-grey-300
            "
          />

          {memoError && (
            <p className="mt-2 text-footnote text-error-500">
              {memoError}
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
