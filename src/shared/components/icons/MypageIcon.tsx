import myPageEmpty from "@/assets/icons/my-empty.svg"
import myPageFilled from "@/assets/icons/my-filled.svg"

interface MyPageIconProps {
  active?: boolean
  className?: string
}

export default function MyPageIcon({
  active = false,
  className = "",
}: MyPageIconProps) {
  return (
    <img
      src={active ? myPageFilled : myPageEmpty}
      alt=""
      aria-hidden="true"
      className={className}
    />
  )
}