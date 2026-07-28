import timeIcon from "@/assets/icons/home-time.svg"
import weatherIcon from "@/assets/icons/home-weather.svg"
import calendarIcon from "@/assets/icons/home-calendar.svg"
import musicIcon from "@/assets/icons/home-music.svg"

export type MaterialIconType =
  | "time"
  | "weather"
  | "calendar"
  | "music"

interface MaterialIconProps {
  type: MaterialIconType
  active: boolean
}

const iconMap: Record<MaterialIconType, string> = {
  time: timeIcon,
  weather: weatherIcon,
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