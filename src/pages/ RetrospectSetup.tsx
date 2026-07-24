// utils
import { useState } from "react"

// components
import BackHeaderLayout from "../shared/components/BackHeaderLayout"
import TextLayout from "../shared/components/TextLayout"
import ButtonPair from "../shared/components/ButtonPair"

// assets
import galleryIcon from '../assets/icons/gallery.svg'
import quoteIcon from '../assets/icons/quote-down-square.svg'
import addIcon from '../assets/icons/add_circle_regular.svg'
import deleteIcon from '../assets/icons/close_circle_filled.svg'

export default function  RetrospectSetup() {
    const [previews, setPreviews] = useState<string[]>([])

    const handleDelete = (index: number) => {
        setPreviews(prev => {
            const next = [...prev]
            next[index] = ''
            return next
        })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0]
        if(!file)
            return
        const url = URL.createObjectURL(file)
        setPreviews(prev => {
            const next = [...prev];
            next[index] = url;
            return next;
        })
    }

    
  return (
    <div className="h-screen overflow-hidden">
        <BackHeaderLayout title="회고하기" onBack={()=>{}}/>
        <div className="mt-2 p-4 pb-[120px] h-full overflow-y-auto">
            <TextLayout mainText={"오늘 하루,\n무슨 일이 있었나요?"} subText="사진, 글 추가로 맞춤형 질문을 준비해드려요" />
            <div className="mt-[51px] flex flex-col gap-6">
                {/* 이미지 추가 섹션 */}
               <div>
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex gap-1">
                            <img src={galleryIcon} alt="" />
                            <p className="text-headline font-semibold text-main-500">이미지 추가</p>
                        </div>
                        <p className="text-caption1 text-gray-500">최대 2장</p>
                    </div>
                    <div className="flex gap-4">
                        {Array.from({ length: 2 }).map((_, index) => (
                            <div key={index} className="flex-1">
                                {previews[index] ? (
                                    <div className="relative">
                                        <img src={previews[index]} className="w-full aspect-square rounded-[24px] object-cover" alt="" />
                                        <img src={deleteIcon} alt="이미지 삭제" onClick={() => handleDelete(index)} className="absolute top-4 right-4 cursor-pointer"/>
                                    </div>
                                ) : (
                                    <label className="w-full aspect-square bg-gray-50 rounded-[24px] flex justify-center items-center">
                                        <input onChange={(e) => handleFileChange(e, index)} type="file" className="hidden" accept="image/*" />
                                        <img src={addIcon} alt="" />
                                    </label>
                                )}
                            </div>
                        ))}
                    </div>
               </div>
               
               {/* 글 추가 섹션 */}
               <div>
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex gap-1">
                            <img src={quoteIcon} alt="" />
                            <p className="text-headline font-semibold text-main-500">글 추가</p>
                        </div>
                        <p className="text-caption1 text-gray-500">최대 200자</p>
                    </div>
                    <textarea
                        className="w-full h-[177px] border border-gray-200 placeholder:text-gray-300 rounded-[24px] p-4 resize-none"
                        placeholder="오늘 있었던 일에 대해서 자유롭게 적어주세요"
                    />
               </div>

            </div>
            <div className="fixed bottom-[50px] left-0 right-0 px-4">
                <ButtonPair onSkip={()=>{}} onClick={()=>{}}/>
            </div>
        </div>
    </div>
  )
}
