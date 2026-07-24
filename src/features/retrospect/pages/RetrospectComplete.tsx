import NoteIcon from "@/shared/components/icons/NoteIcon"
import TextLayout from "@/shared/components/TextLayout"
import Button from "@/shared/components/Button"

export default function RetrospectComplete() {
  return (
    <div className="h-screen flex flex-col gap-20 justify-center items-center">
        <div className="flex flex-col justify-center items-center">
            <NoteIcon checked />
            <div className="mt-6">
                <TextLayout mainText="회고록이 등록되었습니다" mainTextSize="title2" center subText="방금 남긴 일기로 영어 회고를 시작해보세요"/>
            </div>
        </div>
        <div className="w-full px-4 flex flex-col gap-1">
            <Button type="sub" label="홈화면 바로가기" onClick={()=>{}}/>
            <Button label="전체 교정문 보러가기" onClick={()=>{}}/>
        </div>
    </div>
  )
}
