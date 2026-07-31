import { useState } from "react"
import QBadge from "@/shared/components/QBadge"

interface AiMessageProps{
    isSpeaking: boolean
}

export default function AiMessage({ isSpeaking }: AiMessageProps) {
    const [isTranslated, setIsTranslated] = useState(false)

    const handleTranslate = () => {
        setIsTranslated(true)
    }
  return (
    <div className="w-full h-full pl-4 pr-20 flex flex-col gap-2">
        <QBadge />
        <p className="text-subheadline text-white">Will it rain this afternoon? Showers expected around 3 PM.</p>
        {(!isSpeaking && !isTranslated ) && <button onClick={handleTranslate} className="inline-flex text-footnote text-gray-300">한국어 번역</button>}
        {isTranslated && <p className="text-footnote text-gray-300">오후에 비가 올까요? 오후 3시쯤 소나기가 올 것으로 보여요. 우산 챙기세요.</p>}
    </div>
  )
}
