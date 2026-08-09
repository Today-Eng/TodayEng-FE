// react
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// components
import TextLayout from "@/shared/components/TextLayout"
import NoteIcon from "@/shared/components/icons/NoteIcon"
import ButtonPair from "@/shared/components/ButtonPair"

// api
import { completeDiary } from "@/features/retrospect/create/api/diaryApi"

export default function RetrospectMemo() {
  const navigate = useNavigate()
  const { diaryId: diaryIdParam } = useParams<{ diaryId: string }>()
  const diaryId = Number(diaryIdParam)

  const [memo, setMemo] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const complete = async (finalMemo: string | null) => {
    if (isLoading) return
    if (!Number.isFinite(diaryId)) {
      navigate('/home', { replace: true })
      return
    }
    setIsLoading(true)
    try {
      await completeDiary(diaryId, finalMemo)
      navigate('/retrospect-complete', { replace: true })
    } catch {
      setIsLoading(false)
    }
  }

  return (
    <div className="pt-[78px] flex flex-col p-4">
      <NoteIcon />
      <div className="mt-4 mb-6">
        <TextLayout mainText={"오늘 대화에서 남기고 싶은\n 메모를 자유롭게 적어주세요"} mainTextSize="title2" />
      </div>
      <div>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          className="w-full h-[460px] border border-gray-200 rounded-[24px] p-4"
          placeholder="나눈 대화에 대해서 느낀 점을 자유롭게 적어주세요"
        />
      </div>
      <div className="fixed bottom-[50px] left-0 right-0 px-4">
        <ButtonPair
          rightLabel="완료하기"
          disabled={!memo.trim() || isLoading}
          onSkip={() => void complete(null)}
          onClick={() => void complete(memo.trim())}
        />
      </div>
    </div>
  )
}
