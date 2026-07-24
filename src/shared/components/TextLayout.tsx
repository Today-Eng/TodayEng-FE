interface TextLayoutProps{
    mainText: string
    subText?: string
}

export default function TextLayout({ mainText, subText }: TextLayoutProps) {
  return (
    <div className="flex flex-col gap-1">
        <h1 className="text-title1 font-semibold whitespace-pre-line">{mainText}</h1>
        <p className="text-body text-gray-600">{subText}</p>
    </div>
  )
}
