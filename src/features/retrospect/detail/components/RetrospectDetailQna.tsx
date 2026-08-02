import RetrospectQna from "@/shared/components/RetrospectQna"

import type {
  RetrospectQuestionAnswer,
  RetrospectViewMode,
} from "@/features/retrospect/detail/types"

interface RetrospectDetailQnaProps {
  qa: RetrospectQuestionAnswer
  viewMode: RetrospectViewMode
  showDivider: boolean
  onTranslationClick: (
    qa: RetrospectQuestionAnswer,
  ) => void
  onExplanationClick: (
    qa: RetrospectQuestionAnswer,
  ) => void
}

export default function RetrospectDetailQna({
  qa,
  viewMode,
  showDivider,
  onTranslationClick,
  onExplanationClick,
}: RetrospectDetailQnaProps) {
  const answerText =
    viewMode === "CORRECTED"
      ? qa.answer.correctedText
      : qa.answer.originalText

  return (
    <article>
      <RetrospectQna
        question={qa.questionText}
        answer={answerText}
      />

      {viewMode === "CORRECTED" && (
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={() =>
              onTranslationClick(qa)
            }
            className="
              rounded-full
              bg-grey-100
              p-2
              text-caption1
              font-semibold
              text-grey-700
            "
          >
            한국어 번역
          </button>

          <button
            type="button"
            onClick={() =>
              onExplanationClick(qa)
            }
            className="
              rounded-full
              bg-main-100
              p-2
              text-caption1
              font-semibold
              text-main-500
            "
          >
            해설 보기
          </button>
        </div>
      )}

      {showDivider && (
        <div className="mt-3 border-b border-grey-200" />
      )}
    </article>
  )
}