import CalendarWrittenMarker from "./WrittenMarker"

import type { CalendarDayStatus } from "../types"

interface CalendarDayProps {
  day: number
  date: string
  status: CalendarDayStatus
  selected: boolean
  isToday: boolean
  onClick: (date: string) => void
}

export default function CalendarDay({
  day,
  date,
  status,
  selected,
  isToday,
  onClick,
}: CalendarDayProps) {
  const isWritten = status === "WRITTEN"
  const isFuture = status === "FUTURE"

  const textClassName = (() => {
    if (isWritten) {
      return isToday
        ? "text-white"
        : "text-main-500"
    }

    if (isFuture) {
      return "text-grey-300"
    }

    return "text-grey-900"
  })()

  return (
    <button
      type="button"
      disabled={isFuture}
      onClick={() => onClick(date)}
      aria-label={`${date} 선택`}
      aria-pressed={selected}
      className={[
        "relative flex h-7 w-7 items-center justify-center",
        "disabled:cursor-default",
        selected && !isWritten
          ? [
              "after:absolute",
              "after:-bottom-[3px]",
              "after:left-1/2",
              "after:h-1",
              "after:w-1",
              "after:-translate-x-1/2",
              "after:rounded-full",
              "after:bg-main-500",
            ].join(" ")
          : "",
      ].join(" ")}
    >
      {isWritten && (
        <CalendarWrittenMarker active={isToday} />
      )}

      <span
        className={[
          "relative z-10 translate-y-px",
          "flex h-[18px] min-w-4 items-center justify-center",
          "text-footnote font-normal",
          textClassName,
        ].join(" ")}
      >
        {day}
      </span>
    </button>
  )
}