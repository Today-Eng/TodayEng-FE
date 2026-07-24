import LogoIcon from "../../../shared/components/icons/LogoIcon"

export default function RetrospectStartModal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
    <div className="w-[320px] h-[214px] flex flex-col justify-center items-center gap-6 bg-main-500 rounded-[34px] p-4">
        <LogoIcon width={94.21} height={71}/>
        <div className="flex flex-col gap-2 justify-center items-center">
            <h1 className="text-title3 font-semibold text-white">질문이 준비되었어요</h1>
            <p className="text-headline text-gray-200">영어 회고를 시작해볼까요?</p>
        </div>
        <button className="w-full h-[42px] bg-white rounded-[100px] text-[14px] font-semibold text-main-500">시작하기</button>
    </div>
    </div>
  )
}
