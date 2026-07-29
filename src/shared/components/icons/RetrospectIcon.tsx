import diaryEmpty from "@/assets/icons/bottomNav/retrospect-empty.svg"
import diaryFilled from "@/assets/icons/bottomNav/retrospect-filled.svg"

interface RetrospectIconProps {
  active?: boolean
  className?: string
}

export default function RetrospectIcon({
  active = false,
  className = "",
}: RetrospectIconProps) {
  return (
    <img
      src={active ? diaryFilled : diaryEmpty}
      alt=""
      aria-hidden="true"
      className={className}
    />
  )
}