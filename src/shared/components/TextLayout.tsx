interface TextLayoutProps{
    mainText: string
    subText?: string
    mainTextSize?: 'title1' | 'title2'
    center?: boolean
}

export default function TextLayout({ mainText, subText, mainTextSize = 'title1', center = false }: TextLayoutProps) {
  return (
    <div className={`flex flex-col gap-1 ${center ? 'items-center text-center' : ''}`}>
        <h1 className={`text-${mainTextSize} font-semibold whitespace-pre-line`}>{mainText}</h1>
        <p className="text-body text-gray-600">{subText}</p>
    </div>
  )
}
