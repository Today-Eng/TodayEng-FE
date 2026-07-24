// components
import AiMessage from "@/features/retrospect/components/AiMessage"
import UserMessage from "@/features/retrospect/components/UserMessage"

// assets
import speakIcon from '@/assets/icons/mic_regular.svg'
import checkIcon from '@/assets/icons/check_regular.svg'
import speakingGif from '@/assets/speaking.gif'

// utils
import { useState } from "react"

type SpeakStatus =  'idle' | 'speaking'

export default function  RetrospectSession() {
    const [isAiSpeaking, setIsAiSpeaking] = useState(false) // 비활성화 일때
    const [speakStatus, setSpeakStatus] = useState<SpeakStatus>('idle')

    const handleSpeak = () => {
        setSpeakStatus(prev => prev === 'idle' ? 'speaking' : 'idle')
    }

  return (
    <div className="min-h-screen pt-[62px]" style={{ background: 'linear-gradient(to bottom, #202939, #000000)' }}>
        
        {/* 회고 세션 */}
        <div className="flex flex-col gap-4">
            <AiMessage isSpeaking={false}/>
            <UserMessage isSpeaking={true}/>
            <AiMessage isSpeaking={false}/>
        </div>
        

        {/* 하단바 */}
        <div className="fixed z-10 bottom-[34px] left-0 right-0 px-4 flex items-center">
            <button className="w-[74px] h-[42px] bg-error-100 text-error-500 text-[14px] font-semibold rounded-[100px] hover:bg-error-200">종료</button>

            {(!isAiSpeaking && speakStatus === 'speaking') && <img src={speakingGif} alt="" className="absolute -top-[120px] left-1/2 -translate-x-1/2"/>}

            <button
                onClick={handleSpeak}
                disabled={isAiSpeaking}
                className="absolute left-1/2 -translate-x-1/2 flex justify-center items-center w-[60px] h-[60px] rounded-[100px]"
                style={{ background: isAiSpeaking ? 'linear-gradient(to bottom, #A6B2BF, #697586)' : 'linear-gradient(to bottom, #A487D4, #643DA8)' }}
            >
                {speakStatus === 'speaking' ? <img src={checkIcon} alt="" /> : <img src={speakIcon} alt="" />}
            </button>
        </div>
    </div>
  )
}