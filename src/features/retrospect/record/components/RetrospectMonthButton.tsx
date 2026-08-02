import MonthPrev from "@/assets/icons/retrospect/month-prev.svg"
import MonthNext from "@/assets/icons/retrospect/month-next.svg"

interface RetrospectMonthButtonProps {
  year: number
  month: number
  isSheetOpen: boolean
  disableNext?: boolean
  onPreviousMonth: () => void
  onNextMonth: () => void
  onOpenSheet: () => void
}

export default function RetrospectMonthButton({
  year,
  month,
  isSheetOpen,
  disableNext = false,
  onPreviousMonth,
  onNextMonth,
  onOpenSheet,
}: RetrospectMonthButtonProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={onPreviousMonth}
        aria-label="이전 달"
        className="
          flex
          h-5
          w-[25px]
          items-center
          justify-center
        "
      >
        <img src={MonthPrev} alt="이전 달" />
      </button>

      <button
        type="button"
        onClick={onOpenSheet}
        aria-expanded={isSheetOpen}
        className="
          flex
          items-center
          justify-center
          gap-2
          text-title2
          font-semibold
          text-black
        "
      >
        <span>
          {year}년 {month}월
        </span>
      </button>

      <button
        type="button"
        onClick={onNextMonth}
        disabled={disableNext}
        aria-label="다음 달"
        className="
          flex
          h-5
          w-[25px]
          items-center
          justify-center
          disabled:cursor-default
          disabled:opacity-30
        "
      >
        <img src={MonthNext} alt="다음 달" />
      </button>
    </div>
  )
}