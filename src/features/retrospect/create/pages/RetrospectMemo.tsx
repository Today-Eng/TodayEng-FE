// react
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// components
import TextLayout from "@/shared/components/TextLayout"
import NoteIcon from "@/shared/components/icons/NoteIcon"
import ButtonPair from "@/shared/components/ButtonPair"

export default function RetrospectMemo() {
  const navigate = useNavigate()
  const { diaryId } = useParams();
  const [memo, setMemo] = useState('')

  const handleSubmit = () => {
    navigate(`/retrospect/${diaryId}/complete`)
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
        ></textarea>
      </div>
      <div className="fixed bottom-[50px] left-0 right-0 px-4">
          <ButtonPair rightLabel="완료하기" disabled={!memo.trim()} onSkip={()=>navigate(`/retrospect/${diaryId}/complete`)} onClick={handleSubmit}/>
      </div>
    </div>
  )
}
