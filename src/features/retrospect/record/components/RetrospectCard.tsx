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
        rounded-[32px]
        bg-white
        px-4
        py-4
        shadow-[0_2px_8px_rgba(0,0,0,0.10)]
      "
    >
      <RetrospectPreview
        diary={diary}
        onDetailClick={onDetailClick}
      />
    </article>
  )
}