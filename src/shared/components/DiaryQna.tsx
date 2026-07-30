import questionIcon from "@/assets/icons/question-icon.svg"
import answerIcon from "@/assets/icons/answer-icon.svg"

interface DiaryQnaProps {
  question: string
  answer: string
}

export default function DiaryQna({
  question,
  answer,
}: DiaryQnaProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-[9px]">
        <img
          src={questionIcon}
          alt=""
          className="h-5 w-5 shrink-0"
        />

        <p className="text-footnote font-normal text-black">
          {question}
        </p>
      </div>

      <div className="flex items-start gap-[9px]">
        <img
          src={answerIcon}
          alt=""
          className="h-5 w-5 shrink-0"
        />

        <p className="text-footnote font-normal text-black">
          {answer}
        </p>
      </div>
    </div>
  )
}