import MessageBadge from '@/shared/components/MessageBadge';

interface RetrospectQnaProps {
  question: string
  answer?: string | null
  questionTranslation?: string
  questionVariant?: "pink" | "grey"
}

export default function RetrospectQna({
  question,
  answer,
  questionTranslation,
  questionVariant = 'grey',
}: RetrospectQnaProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-[9px]">
        <MessageBadge type="Q" variant={questionVariant} />

        <p className="text-footnote font-normal text-black">{question}</p>
      </div>

      {questionTranslation && (
        <p className="text-subheadline font-normal text-grey-800">{questionTranslation}</p>
      )}

      <div className="flex items-start gap-[9px]">
        <MessageBadge type="A" />

        <p className="text-footnote font-normal text-black">
          {answer?.trim() || '답변이 없습니다.'}
        </p>
      </div>
    </div>
  );
}
