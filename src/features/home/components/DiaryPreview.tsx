import type { DiaryPreviewData } from "../types"

import MessageBadge from "@/shared/components/MessageBadge"
import detailArrow from "@/assets/icons/detail-arrow.svg"

interface DiaryPreviewProps {
  diary: DiaryPreviewData
  onDetailClick: (diaryId: number) => void
}

export default function DiaryPreview({
  diary,
  onDetailClick,
}: DiaryPreviewProps) {
  return (
    <div className="mt-4">
      <div className="mt-3 space-y-2">
        <div className="flex items-start gap-[9px]">
          <MessageBadge type="Q" variant="grey" />

          <p className="text-footnote text-black font-normal">
            {diary.firstQuestion}
          </p>
        </div>

        <div className="flex items-start gap-[9px]">
          <MessageBadge type="A" />

          <p className="text-footnote text-black font-normal">
            {diary.firstAnswer}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onDetailClick(diary.diaryId)}
        className="mt-4 flex h-8 w-full items-center justify-center gap-2 rounded-full bg-grey-100 text-caption1 font-semibold text-grey-700"
      >
        상세 보기
        <img src={detailArrow} alt="" className="h-[10px] w-[10px]" />
      </button>
    </div>
  )
}