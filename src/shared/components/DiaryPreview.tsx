import questionIcon from "@/assets/icons/question-icon.svg"
import answerIcon from "@/assets/icons/answer-icon.svg"
import detailArrow from "@/assets/icons/detail-arrow.svg"

import KeywordList from "@/shared/components/KeywordList"

import type { DiaryPreviewData } from "@/shared/types/diary"

interface DiaryPreviewProps {
  diary: DiaryPreviewData
  onDetailClick?: (diaryId: number) => void
}

export default function DiaryPreview({
  diary,
  onDetailClick,
}: DiaryPreviewProps) {
  return (
    <div>
      <header className="flex items-start justify-between gap-3">
        <div className="flex shrink-0 items-center gap-[6px]">
          <strong className="text-subheadline font-semibold text-black">
            {formatDiaryDate(diary.date)}  
          </strong>

          <span className="text-footnote font-normal text-grey-600">
            {getKoreanDayOfWeek(diary.dayOfWeek)}
          </span>
        </div>

        <KeywordList keywords={diary.keywords} />
      </header>

      <div className="mt-4 space-y-2">
        <div className="flex items-start gap-[9px]">
          <img
            src={questionIcon}
            alt=""
            className="h-5 w-5 shrink-0"
          />

          <p className="text-footnote font-normal text-black">
            {diary.firstQuestion}
          </p>
        </div>

        <div className="flex items-start gap-[9px]">
          <img
            src={answerIcon}
            alt=""
            className="h-5 w-5 shrink-0"
          />

          <p className="text-footnote font-normal text-black">
            {diary.firstAnswer}
          </p>
        </div>
      </div>

      {onDetailClick && (
        <button
          type="button"
          onClick={() =>
            onDetailClick(diary.diaryId)
          }
          className="
            mt-4
            flex
            h-8
            w-full
            items-center
            justify-center
            gap-2
            rounded-full
            bg-grey-100
            text-caption1
            font-semibold
            text-grey-700
          "
        >
          상세 보기

          <img
            src={detailArrow}
            alt=""
            className="h-[10px] w-[10px]"
          />
        </button>
      )}
    </div>
  )
}

function formatDiaryDate(date: string) {
  const [, month, day] = date.split("-")

  return `${Number(month)}월 ${Number(day)}일`
}

function getKoreanDayOfWeek(
  dayOfWeek: DiaryPreviewData["dayOfWeek"],
) {
  const labels = {
    MONDAY: "월요일",
    TUESDAY: "화요일",
    WEDNESDAY: "수요일",
    THURSDAY: "목요일",
    FRIDAY: "금요일",
    SATURDAY: "토요일",
    SUNDAY: "일요일",
  }

  return labels[dayOfWeek]
}