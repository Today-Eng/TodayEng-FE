import detailArrow from "@/assets/icons/detail-arrow.svg"

import RetrospectQna from "@/shared/components/RetrospectQna"
import KeywordList from "@/shared/components/KeywordList"

import type { RetrospectPreviewData } from "@/shared/types/retrospect"

import {
  formatDiaryDate,
  getKoreanDayOfWeek,
} from "@/shared/utils/dateFormat"

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