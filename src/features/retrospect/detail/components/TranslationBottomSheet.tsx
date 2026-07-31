import { useEffect } from "react"

import CloseBtn from "@/assets/icons/retrospect/close-button.svg"
import RetrospectQna from "@/shared/components/RetrospectQna"
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

        <RetrospectQna
          question={qa.questionText}
          questionTranslation={
            qa.questionKoreanTranslation
          }
          answer={qa.answer.correctedText}
        />
      </section>
    </div>
  )
}