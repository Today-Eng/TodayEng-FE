import {
  useEffect,
  useRef,
  useState,
} from "react"
import {
  useLocation,
  useNavigate,
} from "react-router-dom"

import BackHeader from "@/shared/components/BackHeaderLayout"

interface MemoEditLocationState {
  memo?: string
}

export default function RetrospectMemoEditPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const locationState =
    location.state as
      | MemoEditLocationState
      | null

  const initialMemo =
    locationState?.memo ?? ""

  const [memo, setMemo] =
    useState(initialMemo)

  const [isSaving, setIsSaving] =
    useState(false)

  const saveTimerRef =
    useRef<number | null>(null)

  const isChanged =
    memo.trim() !== initialMemo.trim()

  const canSave =
    memo.trim().length > 0 &&
    isChanged &&
    !isSaving

  useEffect(() => {
    return () => {
      if (saveTimerRef.current !== null) {
        window.clearTimeout(
          saveTimerRef.current
        )
      }
    }
  }, [])

  const handleBack = () => {
    if (isSaving) {
      return
    }

    navigate(-1)
  }

  const handleSave = async () => {
    if (!canSave) {
      return
    }

    try {
      setIsSaving(true)

      await new Promise<void>((resolve) => {
        saveTimerRef.current =
          window.setTimeout(() => {
            saveTimerRef.current = null
            resolve()
          }, 500)
      })

      navigate(-1)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-dvh bg-white">
      <main
        className="
          min-h-dvh
          w-full
          pt-[130px]
        "
      >
        <BackHeader
          title="메모 수정하기"
          onBack={handleBack}
          rightAction={{
            type: "confirm",
            onClick: handleSave,
            disabled: !canSave,
          }}
        />

        <section className="mt-4 px-4">
          <textarea
            value={memo}
            onChange={(event) => {
              setMemo(event.target.value)
            }}
            placeholder="나눈 대화에 대해서 느낀 점을 자유롭게 적어주세요"
            maxLength={1000}
            className="
              h-[660px]
              w-full
              resize-none
              rounded-[24px]
              border
              border-grey-200
              bg-white
              px-4
              py-4
              text-body
              font-normal
              text-black
              outline-none
              placeholder:text-grey-300
            "
          />
        </section>
      </main>
    </div>
  )
}