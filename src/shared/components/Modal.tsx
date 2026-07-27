interface ModalProps {
  mainText: string
  subText: string
  leftButtonText: string
  rightButtonText: string
  onLeftClick: () => void
  onRightClick: () => void
}

export default function Modal({ mainText, subText, leftButtonText, rightButtonText, onLeftClick, onRightClick }: ModalProps) {
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/50">
      <div className="px-4 py-6 w-[320px] bg-white rounded-[34px]">
        <p className="text-title3 font-semibold mb-2">{mainText}</p>
        <p className="text-subheadline text-gray-600 mb-6 whitespace-pre-line">{subText}</p>
        <div className="flex gap-2">
          <button onClick={onLeftClick} className="flex-1 py-3 bg-gray-100 text-gray-700 text-[14px] font-semibold rounded-[100px]">{leftButtonText}</button>
          <button onClick={onRightClick} className="flex-1 py-3 bg-error-100 text-error-500 text-[14px] font-semibold rounded-[100px]">{rightButtonText}</button>
        </div>
      </div>
    </div>
  )
}
