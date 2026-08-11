import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BottomNav from '@/shared/components/BottomNav';
import KeywordList from '@/shared/components/KeywordList';
import Modal from '@/shared/components/Modal';
import BackHeaderLayout from '@/shared/components/BackHeaderLayout';

import ExplanationBottomSheet from '@/features/retrospect/detail/components/ExplanationBottomSheet';
import MoreBottomSheet from '@/features/retrospect/detail/components/MoreBottomSheet';
import RetrospectDetailQna from '@/features/retrospect/detail/components/RetrospectDetailQna';
import RetrospectMemo from '@/features/retrospect/detail/components/RetrospectMemo';
import RetrospectViewToggle from '@/features/retrospect/detail/components/RetrospectViewToggle';
import TranslationBottomSheet from '@/features/retrospect/detail/components/TranslationBottomSheet';
import useRetrospectDetail from '@/features/retrospect/detail/hooks/useRetrospectDetail';

import { formatDiaryDate, getKoreanDayOfWeek } from '@/shared/utils/dateFormat';
import { useDeleteRetrospectMutation } from '@/features/retrospect/detail/queries';

export default function RetrospectDetailPage() {
  const navigate = useNavigate();

  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const {
    retrospect,
    isLoading,
    isError,

    viewMode,
    translationTarget,
    explanationTarget,

    handleViewModeChange,
    handleTranslationOpen,
    handleTranslationClose,
    handleExplanationOpen,
    handleExplanationClose,
  } = useRetrospectDetail();

  const { mutateAsync: deleteRetrospect, isPending: isDeleting } = useDeleteRetrospectMutation();

  if (isLoading) {
    return (
      <main className="min-h-dvh bg-white">
        <BackHeaderLayout title="회고록 상세 보기" />

        <div className="flex min-h-[300px] items-center justify-center text-body text-grey-500">
          회고록을 불러오는 중입니다.
        </div>
      </main>
    );
  }

  if (isError || !retrospect) {
    return (
      <main className="min-h-dvh bg-white">
        <BackHeaderLayout title="회고록 상세 보기" />

        <div className="flex min-h-[300px] items-center justify-center text-body text-grey-500">
          회고록을 불러오지 못했습니다.
        </div>
      </main>
    );
  }

  const handleMemoEditClick = () => {
    setIsActionSheetOpen(false);

    navigate(`/retrospects/${retrospect.diaryId}/memo/edit`, {
      state: {
        memo: retrospect.memo,
      },
    });
  };

  const handleDeleteClick = () => {
    setIsActionSheetOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (isDeleting) {
      return;
    }

    setDeleteError('');

    try {
      await deleteRetrospect(retrospect.diaryId);

      setIsDeleteModalOpen(false);

      navigate('/retrospects', {
        replace: true,
      });
    } catch (error) {
      setDeleteError('회고록 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="min-h-dvh bg-white">
      <main
        className="
          min-h-dvh
          w-full
          pb-[109px]
          pt-[calc(68px+var(--sat))]
        "
      >
        <BackHeaderLayout
          title="회고록 상세 보기"
          rightAction={{
            type: 'more',
            onClick: () => {
              setIsActionSheetOpen(true);
            },
          }}
        />

        <section className="bg-white px-4 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <strong className="text-title3 font-semibold text-black">
                {formatDiaryDate(retrospect.diaryDate)}
              </strong>

              <span className="text-body font-normal text-grey-600">
                {getKoreanDayOfWeek(retrospect.dayOfWeek)}
              </span>
            </div>

            <RetrospectViewToggle value={viewMode} onChange={handleViewModeChange} />
          </div>

          <div className="mt-2">
            <KeywordList keywords={retrospect.keywords} align="start" />
          </div>

          <div className="mt-8 space-y-3">
            {retrospect.qaList.map((qa, index) => (
              <RetrospectDetailQna
                key={qa.questionId}
                qa={qa}
                viewMode={viewMode}
                showDivider={index < retrospect.qaList.length - 1}
                onTranslationClick={handleTranslationOpen}
                onExplanationClick={handleExplanationOpen}
              />
            ))}
          </div>
        </section>

        <RetrospectMemo memo={retrospect.memo} />
      </main>

      <BottomNav />

      <TranslationBottomSheet qa={translationTarget} onClose={handleTranslationClose} />

      <ExplanationBottomSheet qa={explanationTarget} onClose={handleExplanationClose} />

      <MoreBottomSheet
        isOpen={isActionSheetOpen}
        onClose={() => {
          setIsActionSheetOpen(false);
        }}
        onEditClick={handleMemoEditClick}
        onDeleteClick={handleDeleteClick}
      />

      {isDeleteModalOpen && (
        <Modal
          mainText={
            deleteError
              ? '회고록을 삭제하지 못했습니다'
              : '회고록을 삭제하시겠습니까?'
          }
          subText={
            deleteError
              ? deleteError
              : '삭제하면 복구하거나 같은 날짜에 다시 작성할 수 없어요'
          }
          leftButtonText={deleteError ? '닫기' : '취소'}
          rightButtonText={deleteError ? '다시 시도' : '삭제'}
          onLeftClick={() => {
            setDeleteError('');
            setIsDeleteModalOpen(false);
          }}
          onRightClick={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
