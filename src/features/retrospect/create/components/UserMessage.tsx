// react
import { useState } from 'react'

interface UserMessageProps {
  originalText: string
  correctedText: string | null
  correctionReason: string | null
  onClick?: () => void
}

export default function UserMessage({ originalText, correctedText, correctionReason, onClick }: UserMessageProps) {
  const [showCorrection, setShowCorrection] = useState(false)

  const handleCorrectionClick = () => {
    setShowCorrection(true)
    onClick?.()
  }

  return (
    <div className="w-full h-full pr-4 pl-20">
      <div className="p-4 bg-main-500/30 rounded-[24px]">
        <p className="text-subheadline text-white mb-2">{originalText}</p>
        {correctedText && !showCorrection && (
          <div className="flex justify-end">
            <button
              onClick={handleCorrectionClick}
              className="mt-1 text-xs text-main-200 no-underline"
            >
              교정하기
            </button>
          </div>
        )}
        {showCorrection && correctedText && (
          <div className="flex flex-col gap-3 mt-3">
            <div className="border border-white/20" />
            <p className="text-success-300 text-subheadline">{correctedText}</p>
            {correctionReason && (
              <p className="text-subheadline text-main-100">{correctionReason}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
