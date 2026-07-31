import detailArrow from "@/assets/icons/detail-arrow.svg"

import RetrospectQna from "@/shared/components/RetrospectQna"
import KeywordList from "@/shared/components/KeywordList"

import type { RetrospectPreviewData } from "@/shared/types/retrospect"

interface RetrospectPreviewProps {
  diary: RetrospectPreviewData
  onDetailClick?: (diaryId: number) => void
}

export default function RetrospectPreview({
  diary,
  onDetailClick,
}: RetrospectPreviewProps) {
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

      <div className="mt-4">
        <RetrospectQna
          question={diary.firstQuestion}
          answer={diary.firstAnswer}
        />
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
  dayOfWeek: RetrospectPreviewData["dayOfWeek"],
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