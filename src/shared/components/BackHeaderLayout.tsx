import chevronLeft from '../../assets/icons/chevron-left.svg'

interface BackHeaderLayoutProps{
    title: string
    onBack: () => void
}

export default function BackHeaderLayout({ title, onBack }: BackHeaderLayoutProps) {
  return (
    <div className='mt-[62px] flex gap-4 px-4 py-5'>
        <button onClick={onBack}>
          <img src={chevronLeft} alt="" />
        </button>
        <div className='text-title2 font-semibold'>{title}</div>
    </div>
  )
}
