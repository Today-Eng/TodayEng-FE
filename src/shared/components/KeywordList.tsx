interface KeywordListProps {
  keywords: string[]
}

export default function KeywordList({
  keywords,
}: KeywordListProps) {
  return (
    <div className="flex flex-wrap justify-end gap-1">
      {keywords.map((keyword) => (
        <span
          key={keyword}
          className="
            rounded-full
            bg-sub-100
            px-[6px]
            py-1
            text-caption2
            font-semibold
            text-sub-500
          "
        >
          {keyword}
        </span>
      ))}
    </div>
  )
}