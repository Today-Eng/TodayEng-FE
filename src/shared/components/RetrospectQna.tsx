import MessageBadge from "@/shared/components/MessageBadge"

interface RetrospectQnaProps {
  question: string
  answer: string
  questionTranslation?: string
  questionVariant?: "pink" | "grey"
}

export default function RetrospectQna({
  question,
  answer,
  questionTranslation,
  questionVariant = "grey",
}: RetrospectQnaProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-[9px]">
        <MessageBadge type="Q" variant={questionVariant} />

        <p className="text-footnote font-normal text-black">
          {question}
        </p>
      </div>

      {questionTranslation && (
        <p className="text-subheadline font-normal text-grey-800">
          {questionTranslation}
        </p>
      )}

      <div className="flex items-start gap-[9px]">
        <MessageBadge type="A" />

        <p className="text-footnote font-normal text-black">
          {answer}
        </p>
      </div>
    </div>
  )
}