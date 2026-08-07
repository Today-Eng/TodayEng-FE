import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import BackHeaderLayout from "@/shared/components/BackHeaderLayout"
import loadingVideo from '@/assets/loading.mp4'

export default function RetrospectLoading() {
  const navigate = useNavigate()
  const { diaryId } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/retrospect/${diaryId}/session`)
    }, 3000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div> 
        <BackHeaderLayout title="회고하기" />
        <div className="flex flex-col items-center mt-[78px]">
            <video src={loadingVideo} autoPlay loop muted className="w-[247px] h-[247px]"></video>
            <div className="mt-[30px] flex flex-col items-center">
                <h1 className="text-title2 font-semibold mb-4">오늘의 질문을 준비하고 있어요</h1>
                <p className="text-body text-gray-600 text-center">
                    입력한 내용과 오늘의 정보를 
                    <br /> 바탕으로 대화를 만들고 있어요.
                </p>
            </div>
        </div>
    </div>
  )
}
