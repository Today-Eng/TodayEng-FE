import { useEffect } from "react"

import deleteIcon from "@/assets/icons/retrospect/delete-icon.svg"
import editIcon from "@/assets/icons/retrospect/memo-edit.svg"

interface MoreBottomSheetProps {
  isOpen: boolean
  onClose: () => void
  onEditClick: () => void
  onDeleteClick: () => void
}

export default function MoreBottomSheet({
  isOpen,
  onClose,
  onEditClick,
  onDeleteClick,
}: MoreBottomSheetProps) {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousOverflow =
      document.body.style.overflow

    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow =
        previousOverflow
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        aria-label="더보기 메뉴 닫기"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-label="회고록 메뉴"
        className="
          absolute
          bottom-0
          left-1/2
          w-full
          max-w-[402px]
          -translate-x-1/2
          rounded-t-[32px]
          bg-white
          px-4
          pb-6
          pt-3
        "
      >
        <div className="flex justify-center">
          <div className="h-1 w-[80px] rounded-full bg-grey-300" />
        </div>

        <button
          type="button"
          onClick={onEditClick}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-1
            pt-9
            text-left
          "
        >
          <span
            className="
              flex
              h-[34px]
              w-[34px]
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-main-100
            "
          >
            <img
              src={editIcon}
              alt=""
              className="h-6 w-6"
            />
          </span>

          <span className="text-body font-normal text-grey-900">
            메모 수정하기
          </span>
        </button>

        <button
          type="button"
          onClick={onDeleteClick}
          className="
            mt-1
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-1
            pt-3
            text-left
          "
        >
          <span
            className="
              flex
              h-[34px]
              w-[34px]
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-red-50
            "
          >
            <img
              src={deleteIcon}
              alt=""
              className="h-6 w-6"
            />
          </span>

          <span className="text-body font-normal text-grey-900">
            회고록 삭제하기
          </span>
        </button>
      </section>
    </div>
  )
}