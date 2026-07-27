import { useNavigate } from 'react-router-dom'
import chevronLeft from '@/assets/icons/chevron-left.svg'

interface BackHeaderLayoutProps{
    title: string
}

export default function BackHeaderLayout({ title }: BackHeaderLayoutProps) {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }
  return (
    <div className='mt-[62px] flex gap-4 px-4 py-5'>
        <button onClick={goBack}>
          <img src={chevronLeft} alt="" />
        </button>
        <div className='text-title2 font-semibold'>{title}</div>
    </div>
  )
}
