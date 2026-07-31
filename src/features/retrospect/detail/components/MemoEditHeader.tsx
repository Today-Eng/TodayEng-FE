import { useNavigate } from "react-router-dom"

import chevronLeft from "@/assets/icons/chevron-left.svg"

interface RetrospectMemoEditHeaderProps {
  canSave: boolean
  onSave: () => void
}

export default function RetrospectMemoEditHeader({
  canSave,
  onSave,
}: RetrospectMemoEditHeaderProps) {
  const navigate = useNavigate()

  return (
    <header
      className="
        mt-[62px]
        flex
        h-[68px]
        items-center
        justify-between
        px-4
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
          메모 수정하기
        </h1>
      </div>

      <button
        type="button"
        onClick={onSave}
        disabled={!canSave}
        className="
          text-body
          font-semibold
          text-main-500
          disabled:cursor-not-allowed
          disabled:text-grey-300
        "
      >
        확인
      </button>
    </header>
  )
}