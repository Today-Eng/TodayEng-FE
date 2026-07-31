import RetrospectPreview from "@/shared/components/RetrospectPreview"

import type { RetrospectPreviewData } from "@/shared/types/retrospect"

interface RetrospectCardProps {
  diary: RetrospectPreviewData
  onDetailClick: (diaryId: number) => void
}

export default function RetrospectCard({
  diary,
  onDetailClick,
}: RetrospectCardProps) {
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
      <RetrospectPreview
        diary={diary}
        onDetailClick={onDetailClick}
      />
    </article>
  )
}