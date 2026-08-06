interface KeywordListProps {
  keywords: string[]
  align?: "start" | "end"
}

export default function KeywordList({
  keywords,
  align = "end",
}: KeywordListProps) {
  return (
    <div
      className={[
        "flex flex-wrap gap-1",
        align === "start"
          ? "justify-start"
          : "justify-end",
      ].join(" ")}
    >
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