import MaterialIcon from "./icons/MaterialIcon"

import type { MaterialIconType } from "./icons/MaterialIcon"
import ArrowRightIcon from "@/shared/components/icons/ArrowRightIcon";

interface MaterialItemProps {
  icon: MaterialIconType
  label: string
  active: boolean
  onClick?: () => void
}

export default function MaterialItem({
  icon,
  label,
  active,
  onClick,
}: MaterialItemProps) {
  const isClickable = Boolean(onClick)

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isClickable}
      className={[
        "flex min-h-8 items-center gap-2 rounded-full px-3 py-2",
        "text-subheadline font-semibold transition-colors",
        active
          ? "bg-main-100 text-main-500"
          : "bg-grey-50 text-grey-500",
        isClickable
          ? "cursor-pointer"
          : "cursor-default",
      ].join(" ")}
    >
      <MaterialIcon
        type={icon}
        active={active}
      />

      <span>{label}</span>

      {!active && isClickable && (
        <span
          aria-hidden="true"
          className="text-grey-500"
        >
          <ArrowRightIcon />
        </span>
      )}
    </button>
  )
}