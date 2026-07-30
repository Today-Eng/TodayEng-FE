import homeEmpty from "@/assets/icons/bottomNav/home-empty.svg"
import homeFilled from "@/assets/icons/bottomNav/home-filled.svg"

interface HomeIconProps {
  active?: boolean
  className?: string
}

export default function HomeIcon({
  active = false,
  className = "",
}: HomeIconProps) {
  return (
    <img
      src={active ? homeFilled : homeEmpty}
      alt=""
      aria-hidden="true"
      className={className}
    />
  )
}