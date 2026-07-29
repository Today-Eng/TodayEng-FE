import { useId } from "react"

import type { CalendarDayStatus } from "../types"

interface CalendarDayProps {
  day: number
  date: string
  status: CalendarDayStatus
  selected: boolean
  isToday: boolean
  onClick: (date: string) => void
}

interface StarBackgroundProps {
  active: boolean
}

function StarBackground({
  active,
}: StarBackgroundProps) {
  const gradientId = useId()

  return (
    <span
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        left-1/2
        top-1/2
        flex
        h-8
        w-8
        -translate-x-1/2
        -translate-y-1/2
        items-center
        justify-center
      "
    >
      <svg
        viewBox="0 0 27 26"
        className="h-[26px] w-[27px]"
      >
        <defs>
          <radialGradient
            id={gradientId}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(13.5 13) rotate(90) scale(13)"
          >
            <stop stopColor="#F4F0FA" />

            <stop
              offset="1"
              stopColor="#DDD2EF"
            />
          </radialGradient>
        </defs>

        <path
          d="M9.87982 1.5397C11.4813 -0.51323 14.5861 -0.513231 16.1876 1.53969L18.3452 4.30552C18.8074 4.8981 19.4273 5.34847 20.1337 5.605L23.4309 6.8023C25.8782 7.691 26.8377 10.6438 25.3801 12.8013L23.4164 15.708C22.9957 16.3308 22.7589 17.0595 22.7332 17.8106L22.6134 21.3164C22.5245 23.9186 20.0126 25.7435 17.5103 25.024L14.1391 24.0546C13.4168 23.8469 12.6506 23.8469 11.9283 24.0546L8.55705 25.024C6.05476 25.7435 3.54292 23.9186 3.45398 21.3164L3.33416 17.8106C3.30849 17.0595 3.07172 16.3308 2.65098 15.708L0.687265 12.8013C-0.770303 10.6438 0.189133 7.691 2.63646 6.8023L5.93365 5.605C6.64008 5.34847 7.25996 4.8981 7.72223 4.30552L9.87982 1.5397Z"
          fill={
            active
              ? "#774CBE"
              : `url(#${gradientId})`
          }
        />
      </svg>
    </span>
  )
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
        <StarBackground active={isToday} />
      )}

      <span
        className={[
          "relative z-10 translate-y-px",
          "flex h-[18px] min-w-4 items-center justify-center",
          "text-footnote font-normal leading-[18px]",
          textClassName,
        ].join(" ")}
      >
        {day}
      </span>
    </button>
  )
}