import { useNavigate } from "react-router-dom"

import chevronLeft from "@/assets/icons/chevron-left.svg"
import moreIcon from "@/assets/icons/retrospect/more-icon.svg"

interface RetrospectDetailHeaderProps {
  title: string
  onMoreClick?: () => void
}

export default function RetrospectDetailHeader({
  title,
  onMoreClick,
}: RetrospectDetailHeaderProps) {
  const navigate = useNavigate()

  return (
    <header
      className="
        flex
        items-center
        justify-between
        px-4
        py-5
        mt-[62px]
      "
    >
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="뒤로 가기"
          className="
            flex
            h-6
            w-6
            items-center
            justify-center
          "
        >
          <img
            src={chevronLeft}
            alt=""
          />
        </button>

        <h1 className="text-title2 font-semibold text-black">
          {title}
        </h1>
      </div>

      <button
        type="button"
        onClick={onMoreClick}
        aria-label="더보기"
        className="
          flex
          h-6
          w-6
          items-center
          justify-center
        "
      >
        <img
          src={moreIcon}
          alt=""
        />
      </button>
    </header>
  )
}