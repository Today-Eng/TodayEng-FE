import { useEffect } from "react"

import RetrospectQna from "@/shared/components/RetrospectQna"

import CloseBtn from "@/assets/icons/retrospect/close-button.svg"

import type { RetrospectQuestionAnswer } from "../types"

interface ExplanationBottomSheetProps {
  qa: RetrospectQuestionAnswer | null
  onClose: () => void
}

export default function ExplanationBottomSheet({
  qa,
  onClose,
}: ExplanationBottomSheetProps) {
  useEffect(() => {
    if (!qa) {
      return
    }

    const previousOverflow =
      document.body.style.overflow

    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow =
        previousOverflow
    }
  }, [qa])

  if (!qa) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="해설창 닫기"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="explanation-title"
        className="
          absolute
          bottom-0
          left-1/2
          max-h-[78dvh]
          w-full
          -translate-x-1/2
          overflow-y-auto
          rounded-t-[32px]
          bg-white
          px-4
          pb-6
        "
      >
        <div className="sticky top-0 bg-white">
          <div className="flex justify-center pt-3">
            <div className="h-1 w-[80px] rounded-full bg-grey-300" />
          </div>

          <header className="flex items-center justify-between pb-6 pt-9">
            <h2
              id="explanation-title"
              className="text-title2 font-semibold text-black"
            >
              해설 보기
            </h2>

            <button
              type="button"
              onClick={onClose}
              aria-label="닫기"
              className="flex h-6 w-6 items-center justify-center"
            >
              <img
                src={CloseBtn}
                alt=""
              />
            </button>
          </header>
        </div>

        <RetrospectQna
          question={qa.questionText}
          answer={
            qa.answer.correctedText
          }
        />

        <div className="mt-4">
          <span
            className="
              inline-flex
              rounded-full
              bg-main-100
              px-2
              py-1
              text-caption2
              font-semibold
              text-main-500
            "
          >
            교정문
          </span>

          <p className="mt-2 text-subheadline font-normal text-main-500">
            {qa.answer.correctedText}
          </p>
        </div>

          <p className="mt-4 whitespace-pre-wrap text-subheadline font-normal text-grey-800">
            {qa.answer.correctionReason}
          </p>
      </section>
    </div>
  )
}