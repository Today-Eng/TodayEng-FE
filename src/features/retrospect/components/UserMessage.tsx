import { useState } from "react"

interface AiMessageProps{
    isSpeaking: boolean
}

export default function UserMessage({ isSpeaking }: AiMessageProps) {
    const [isCorrected, setIsCorrected] = useState(false)

    const handleCorrect = () => {
        setIsCorrected(true)
    }

  return (
     <div className="w-full h-full pr-4 pl-20">
        <div className='p-4 bg-main-500/30 rounded-[24px]'>
            <p className='text-subheadline text-white mb-2'>Will it rain this afternoon? Showers expected around 3 PM. Bring</p>
            <div className="flex justify-end">
                {(isSpeaking && !isCorrected) && <button onClick={handleCorrect} className="text-footnote text-gray-300">교정</button>}
            </div>
            {isCorrected && (
                <div className="flex flex-col gap-3">
                    <div className="mt-3 border border-white/20"></div>
                    <p className="text-success-300 text-subheadline">Will it rain this afternoon? Showers expected around 3 PM. Bring an umbrella.</p>
                    <p className="text-subheadline text-main-100">해설: 원래 말씀하신 "Work in museum management officer"는 주어와 동사가 빠져있어 문법적으로 완전한 문 장이 아니었어요. 영어에서는 직업을 말할 때 "l work as a ~" 또는 " am a ~"처럼 주어와 동사를 포함하여 완전한 문 장으로 표현하는 것이 자연스러워요. "as a"를 사용하면 어 떤 직책이나 역할로 일하는지를 명확하게 전달할 수 있어 17, "I work as a museum management officer."EFI하면 '저는 박물관 관리 담당자로 일하고 있습니다'라는 의 미를 훨씬 더 유창하게 전달할 수 있답니다.</p>
                </div>
            )}
        </div>
    </div>
  )
}
