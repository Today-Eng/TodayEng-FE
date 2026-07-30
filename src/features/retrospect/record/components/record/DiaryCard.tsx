import DiaryPreview from "@/shared/components/DiaryPreview"

import type { DiaryPreviewData } from "@/shared/types/diary"

interface DiaryCardProps {
  diary: DiaryPreviewData
  onDetailClick: (diaryId: number) => void
}

export default function DiaryCard({
  diary,
  onDetailClick,
}: DiaryCardProps) {
  return (
    <article
      className="
        rounded-[24px]
        bg-white
        px-4
        py-4
        shadow-[0_3px_12px_rgba(18,18,18,0.10)]
      "
    >
      <DiaryPreview
        diary={diary}
        onDetailClick={onDetailClick}
      />
    </article>
  )
}