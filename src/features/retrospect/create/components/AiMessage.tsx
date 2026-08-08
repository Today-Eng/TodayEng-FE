import { useState } from 'react'
import MessageBadge from '@/shared/components/MessageBadge'

interface AiMessageProps {
  questionText: string
  koreanTranslation: string
  isSpeaking: boolean
}

export default function AiMessage({ questionText, koreanTranslation, isSpeaking }: AiMessageProps) {
  const [isTranslated, setIsTranslated] = useState(false)

  return (
    <div className="w-full h-full pl-4 pr-20 flex flex-col gap-2">
      <MessageBadge type="Q" />
      <p className="text-subheadline text-white">{questionText}</p>
      {(!isSpeaking && !isTranslated) && (
        <button onClick={() => setIsTranslated(true)} className="inline-flex text-footnote text-gray-300">
          한국어 번역
        </button>
      )}
      {isTranslated && <p className="text-footnote text-gray-300">{koreanTranslation}</p>}
    </div>
  )
}
