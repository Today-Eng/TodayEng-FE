import { useEffect } from "react"

import type { YearMonth } from "@/features/retrospect/record/types"
import CloseBtn from "@/assets/icons/retrospect/close-button.svg"
import CheckBtn from "@/assets/icons/retrospect/check-regular.svg"

interface MonthBottomSheetProps {
  open: boolean
  year: number
  month: number
  currentYear: number
  currentMonth: number
  onClose: () => void
  onSelect: (value: YearMonth) => void
}

export default function MonthBottomSheet({
  open,
  year,
  month,
  currentYear,
  currentMonth,
  onClose,
  onSelect,
}: MonthBottomSheetProps) {
  useEffect(() => {
    if (!open) {
      return
    }

    const previousOverflow =
      document.body.style.overflow

    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow =
        previousOverflow
    }
  }, [open])

  if (!open) {
    return null
  }

  const maximumMonth =
    year === currentYear ? currentMonth : 12

  const months = Array.from(
    { length: maximumMonth },
    (_, index) => maximumMonth - index,
  )

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="월 선택창 닫기"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="month-sheet-title"
        className="
          absolute
          bottom-0
          left-1/2
          max-h-[72dvh]
          w-full
          -translate-x-1/2
          overflow-hidden
          rounded-t-[32px]
          bg-white
        "
      >
        <div className="flex justify-center pt-3">
          <div className="h-1 w-[80px] rounded-full bg-grey-300" />
        </div>

        <header className="flex pt-9 items-center justify-between px-4">
          <h2
            id="month-sheet-title"
            className="text-title2 font-semibold text-black"
          >
            월 선택하기
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="
              flex
              h-6
              w-6
              items-center
              justify-center
              font-light
              text-grey-600
            "
          >
            <img src={CloseBtn} alt="닫기" />
          </button>
        </header>

        <div className="flex max-h-[calc(72dvh-70px)] flex-col gap-[25px] overflow-y-auto px-4 pb-6 pt-6">
            {months.map((itemMonth) => {
                const selected = itemMonth === month

                return (
                <button
                    key={`${year}-${itemMonth}`}
                    type="button"
                    onClick={() => {
                    onSelect({
                        year,
                        month: itemMonth,
                    })
                    }}
                    className="
                    flex
                    w-full
                    items-center
                    justify-between
                    text-left
                    "
                >
                    <span className="text-body font-normal text-grey-900">
                    {year}년 {itemMonth}월
                    </span>

                    {selected && (
                    <img
                        src={CheckBtn}
                        alt="선택됨"
                    />
                    )}
                </button>
                )
            })}
        </div>
      </section>
    </div>
  )
}