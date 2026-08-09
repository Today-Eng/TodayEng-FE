import timeIcon from "@/assets/icons/home/home-time.svg"
import calendarIcon from "@/assets/icons/home/home-calendar.svg"
import musicIcon from "@/assets/icons/home/home-music.svg"

export type MaterialIconType =
  | "time"
  | "calendar"
  | "music"

interface MaterialIconProps {
  type: MaterialIconType
  active: boolean
}

const iconMap: Record<MaterialIconType, string> = {
  time: timeIcon,
  calendar: calendarIcon,
  music: musicIcon,
}

export default function MaterialIcon({
  type,
  active,
}: MaterialIconProps) {
  return (
    <img
      src={iconMap[type]}
      alt=""
      aria-hidden="true"
      className={[
        "h-[24px] w-[24px] shrink-0",
        active
          ? ""
          : "grayscale opacity-40",
      ].join(" ")}
    />
  )
}