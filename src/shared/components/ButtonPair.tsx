interface ButtonPairProps{
    leftLabel?: string
    rightLabel?: string
    disabled?: boolean
    onSkip: () => void
    onClick: () => void
}

export default function ButtonPair({ leftLabel = '건너뛰기', rightLabel = '추가하기', disabled = false, onSkip, onClick }: ButtonPairProps) {
  return (
    <div className="flex w-full gap-2">
        <button onClick={onSkip} className="flex-1 bg-gray-100 text-headline font-semibold text-gray-700 py-4 rounded-[100px] hover:bg-gray-300">{leftLabel}</button>
        <button onClick={onClick} disabled={disabled} className="flex-1 bg-main-500 text-headline font-semibold text-white py-4 rounded-[100px] hover:bg-main-700 disabled:text-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed">{rightLabel}</button>
    </div>
  )
}
23