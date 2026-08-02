import type { RetrospectViewMode } from "@/features/retrospect/detail/types"

interface RetrospectViewToggleProps {
  value: RetrospectViewMode
  onChange: (
    value: RetrospectViewMode,
  ) => void
}

export default function RetrospectViewToggle({
  value,
  onChange,
}: RetrospectViewToggleProps) {
  return (
    <div
      className="
        flex
        h-8
        w-[130px]
        rounded-full
        bg-grey-100
        p-1
      "
    >
      <button
        type="button"
        onClick={() =>
          onChange("CORRECTED")
        }
        className={[
          "flex flex-1 items-center justify-center rounded-full text-caption1 font-medium",
          value === "CORRECTED"
            ? "bg-white text-main-500 shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
            : "text-grey-400",
        ].join(" ")}
      >
        교정문
      </button>

      <button
        type="button"
        onClick={() =>
          onChange("ORIGINAL")
        }
        className={[
          "flex flex-1 items-center justify-center rounded-full text-caption1 font-medium",
          value === "ORIGINAL"
            ? "bg-white text-main-500 shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
            : "text-grey-400",
        ].join(" ")}
      >
        원문
      </button>
    </div>
  )
}