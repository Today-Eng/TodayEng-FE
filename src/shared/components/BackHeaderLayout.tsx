import { useNavigate } from "react-router-dom"

import chevronLeft from "@/assets/icons/chevron-left.svg"
import moreIcon from "@/assets/icons/retrospect/more-icon.svg"

type HeaderRightAction =
  | {
      type: "none"
    }
  | {
      type: "more"
      onClick: () => void
    }
  | {
      type: "confirm"
      onClick: () => void
      disabled?: boolean
      label?: string
    }

interface BackHeaderProps {
  title: string
  rightAction?: HeaderRightAction
  onBack?: () => void
}

export default function BackHeader({
  title,
  rightAction = { type: "none" },
  onBack,
}: BackHeaderProps) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) {
      onBack()
      return
    }

    navigate(-1)
  }

  return (
    <header
      className="
        fixed
        inset-x-0
        top-0
        z-50
        flex
        w-full
        items-end
        justify-between
        bg-white
        px-4
        pb-5
      "
      style={{ paddingTop: 'var(--sat)', minHeight: 'calc(68px + var(--sat))' }}
    >
      <div className="flex min-w-0 items-center gap-4">
        <button
          type="button"
          onClick={handleBack}
          aria-label="뒤로 가기"
          className="
            flex
            h-6
            w-6
            shrink-0
            items-center
            justify-center
          "
        >
          <img
            src={chevronLeft}
            alt=""
            className="h-[13.28px] w-auto"
          />
        </button>

        <h1 className="truncate text-title2 font-semibold text-black leading-none">
          {title}
        </h1>
      </div>

      {rightAction.type === "more" && (
        <button
          type="button"
          onClick={rightAction.onClick}
          aria-label="더보기"
          className="
            flex
            h-6
            w-6
            shrink-0
            items-center
            justify-center
          "
        >
          <img
            src={moreIcon}
            alt=""
          />
        </button>
      )}

      {rightAction.type === "confirm" && (
        <button
          type="button"
          onClick={rightAction.onClick}
          disabled={rightAction.disabled}
          className="
            flex
            h-6
            shrink-0
            items-center
            justify-center
            text-body
            font-semibold
            text-main-500
            disabled:cursor-not-allowed
            disabled:text-grey-300
          "
        >
          {rightAction.label ?? "확인"}
        </button>
      )}
    </header>
  )
}
