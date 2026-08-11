import { useEffect, useRef, useState } from "react"

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
  const headerRef = useRef<HTMLElement>(null)
  const dateRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)

  const [isKeywordBelow, setIsKeywordBelow] = useState(false)

  useEffect(() => {
    const header = headerRef.current
    const date = dateRef.current
    const measure = measureRef.current

    if (!header || !date || !measure) return

    const checkLayout = () => {
      const headerWidth = header.clientWidth
      const dateWidth = date.offsetWidth
      const keywordWidth = measure.scrollWidth

      setIsKeywordBelow(
        dateWidth + keywordWidth + 12 > headerWidth
      )
    }

    checkLayout()

    const observer = new ResizeObserver(checkLayout)

    observer.observe(header)
    observer.observe(date)
    observer.observe(measure)

    return () => observer.disconnect()
  }, [diary.keywords])

  return (
    <div>
      <div
        ref={measureRef}
        aria-hidden="true"
        className="
          pointer-events-none
          invisible
          absolute
          flex
          w-max
          gap-1
          whitespace-nowrap
        "
      >
        {diary.keywords.map((keyword) => (
          <span
            key={keyword}
            className="
              rounded-full
              bg-sub-100
              px-[6px]
              py-1
              text-caption2
              font-semibold
            "
          >
            {keyword}
          </span>
        ))}
      </div>

      <header
        ref={headerRef}
        className={
          isKeywordBelow
            ? "flex flex-col items-start gap-2"
            : "flex items-start justify-between gap-3"
        }
      >
        <div
          ref={dateRef}
          className="flex shrink-0 items-baseline gap-[6px]"
        >
          <strong className="text-subheadline font-semibold text-black">
            {formatDiaryDate(diary.date)}
          </strong>

          <span className="text-footnote font-normal text-grey-600">
            {getKoreanDayOfWeek(diary.dayOfWeek)}
          </span>
        </div>

        <div className={isKeywordBelow ? "w-full" : "min-w-0"}>
          <KeywordList
            keywords={diary.keywords}
            align={isKeywordBelow ? "start" : "end"}
          />
        </div>
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
          onClick={() => onDetailClick(diary.diaryId)}
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