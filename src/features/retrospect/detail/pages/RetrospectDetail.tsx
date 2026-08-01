import { useState } from "react"
import {
  useNavigate,
  useParams,
} from "react-router-dom"

import BottomNav from "@/shared/components/BottomNav"
import KeywordList from "@/shared/components/KeywordList"
import Modal from "@/shared/components/Modal"

import ExplanationBottomSheet from "../components/ExplanationBottomSheet"
import MoreBottomSheet from "../components/MoreBottomSheet"
import RetrospectDetailQna from "../components/RetrospectDetailQna"
import RetrospectMemo from "../components/RetrospectMemo"
import RetrospectViewToggle from "../components/RetrospectViewToggle"
import TranslationBottomSheet from "../components/TranslationBottomSheet"

import useRetrospectDetailMock from "../hooks/useRetrospectDetailMock"

import {
  formatDiaryDate,
  getKoreanDayOfWeek,
} from "@/shared/utils/dateFormat"
import BackHeaderLayout from "@/shared/components/BackHeaderLayout"

export default function RetrospectDetailPage() {
  const navigate = useNavigate()
  const { diaryId } = useParams()

  const [
    isActionSheetOpen,
    setIsActionSheetOpen,
  ] = useState(false)

  const [
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  ] = useState(false)

  const {
    retrospect,
    viewMode,
    translationTarget,
    explanationTarget,
    handleViewModeChange,
    handleTranslationOpen,
    handleTranslationClose,
    handleExplanationOpen,
    handleExplanationClose,
  } = useRetrospectDetailMock()

  const handleMemoEditClick = () => {
    setIsActionSheetOpen(false)

    navigate(
      `/retrospects/${diaryId ?? retrospect.diaryId}/memo/edit`,
      {
        state: {
          memo: retrospect.memo,
        },
      },
    )
  }

  const handleDeleteClick = () => {
    setIsActionSheetOpen(false)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    // 삭제 api 연동

    setIsDeleteModalOpen(false)

    navigate("/retrospects", {
      replace: true,
    })
  }

  return (
    <div className="min-h-dvh bg-white">
      <main
        className="
          min-h-dvh
          w-full
          pb-[75px]
          pt-[130px]
        "
      >
        <BackHeaderLayout
            title="회고록 상세 보기"
            rightAction={{
                type: "more",
                onClick: () => {
                setIsActionSheetOpen(true)
                },
            }}
            />

        <section className="bg-white px-4 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <strong className="text-title3 font-semibold text-black">
                {formatDiaryDate(
                  retrospect.diaryDate,
                )}
              </strong>

              <span className="text-body font-normal text-grey-600">
                {getKoreanDayOfWeek(retrospect.dayOfWeek)}
              </span>
            </div>

            <RetrospectViewToggle
              value={viewMode}
              onChange={
                handleViewModeChange
              }
            />
          </div>

          <div className="mt-2">
            <KeywordList
              keywords={retrospect.keywords}
              align="start"
            />
          </div>

          <div className="mt-8 space-y-3">
            {retrospect.qaList.map(
              (qa, index) => (
                <RetrospectDetailQna
                  key={qa.questionId}
                  qa={qa}
                  viewMode={viewMode}
                  showDivider={
                    index <
                    retrospect.qaList.length -
                      1
                  }
                  onTranslationClick={
                    handleTranslationOpen
                  }
                  onExplanationClick={
                    handleExplanationOpen
                  }
                />
              ),
            )}
          </div>
        </section>

        <RetrospectMemo
          memo={retrospect.memo}
        />
      </main>

      <BottomNav />

      <TranslationBottomSheet
        qa={translationTarget}
        onClose={handleTranslationClose}
      />

      <ExplanationBottomSheet
        qa={explanationTarget}
        onClose={handleExplanationClose}
      />

      <MoreBottomSheet
        isOpen={isActionSheetOpen}
        onClose={() => {
          setIsActionSheetOpen(false)
        }}
        onEditClick={handleMemoEditClick}
        onDeleteClick={handleDeleteClick}
      />

      {isDeleteModalOpen && (
        <Modal
          mainText="회고록을 삭제하시겠습니까?"
          subText="삭제한 회고록은 다시 복구할 수 없어요"
          leftButtonText="취소"
          rightButtonText="삭제"
          onLeftClick={() => {
            setIsDeleteModalOpen(false)
          }}
          onRightClick={handleDeleteConfirm}
        />
      )}
    </div>
  )
}