// react
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// components
import BackHeaderLayout from '@/shared/components/BackHeaderLayout';

// api
import { startReflectionSession } from '@/features/retrospect/create/api/diaryApi';

// assets
import loadingGif from '@/assets/loading.gif';

export default function RetrospectLoading() {
  const navigate = useNavigate();
  const { diaryId: diaryIdParam } = useParams<{ diaryId: string }>();
  const diaryId = Number(diaryIdParam);

  const calledRef = useRef(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!diaryId || calledRef.current) return;
    calledRef.current = true;

    let active = true;
    const delay = new Promise<void>(resolve => setTimeout(resolve, 3000));

    void Promise.allSettled([startReflectionSession(diaryId), delay])
      .then(([sessionResult]) => {
        if (!active) return;
        if (sessionResult.status === 'rejected') {
          const status = (sessionResult.reason as { status?: number })?.status;
          if (status !== 409) {
            setError(true);
            return;
          }
        }
        navigate(`/retrospect-session/${diaryId}`);
      });

    return () => {
      active = false;
      calledRef.current = false;
    };
  }, [diaryId, navigate]);

  return (
    <div>
      <BackHeaderLayout title="회고하기" />
      <div className="flex flex-col items-center mt-[208px]">
        <img src={loadingGif} alt="loading" className="w-[247px] h-[247px]" />
        <div className="mt-[30px] flex flex-col items-center">
          <h1 className="text-title2 font-semibold mb-4">오늘의 질문을 준비하고 있어요</h1>
          {error ? (
            <p className="text-body text-error-500 text-center">
              준비에 실패했어요. 뒤로 돌아가 다시 시도해주세요.
            </p>
          ) : (
            <p className="text-body text-gray-600 text-center">
              입력한 내용과 오늘의 정보를
              <br /> 바탕으로 대화를 만들고 있어요.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
