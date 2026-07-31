import { useEffect } from "react"

import answerIcon from "@/assets/icons/answer-icon.svg"
import questionIcon from "@/assets/icons/question-icon.svg"
import CloseBtn from "@/assets/icons/retrospect/close-button.svg"

import type { RetrospectQuestionAnswer } from "../types"

interface TranslationBottomSheetProps {
  qa: RetrospectQuestionAnswer | null
  onClose: () => void
}

export default function TranslationBottomSheet({
  qa,
  onClose,
}: TranslationBottomSheetProps) {
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
        aria-label="번역창 닫기"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="translation-title"
        className="
          absolute
          bottom-0
          left-1/2
          w-full
          max-w-[402px]
          -translate-x-1/2
          rounded-t-[32px]
          bg-white
          px-4
          pb-6
        "
      >
        <div className="flex justify-center pt-3">
          <div className="h-1 w-[80px] rounded-full bg-grey-300" />
        </div>

        <header className="flex items-center justify-between pb-6 pt-9">
          <h2
            id="translation-title"
            className="text-title2 font-semibold text-grey-900"
          >
            한국어 번역
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

        <div className="space-y-2">
          <div className="flex items-start gap-[9px]">
            <img
              src={questionIcon}
              alt=""
              className="h-5 w-5 shrink-0"
            />

            <p className="text-footnote font-normal text-black">
              {qa.questionText}
            </p>
          </div>

          <p className="text-subheadline font-normal text-grey-800">
            {qa.questionKoreanTranslation}
          </p>

          <div className="flex items-start gap-[9px]">
            <img
              src={answerIcon}
              alt=""
              className="h-5 w-5 shrink-0"
            />

            <p className="text-footnote font-normal text-black">
              {qa.answer.correctedText}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}