import editIcon from "@/assets/icons/home-edit.svg"
import arrowIcon from "@/assets/icons/home-arrow.svg"

interface HomeStatCardProps {
  label: string
  value: number
  unit: string
  icon: "diary" | "streak"
}

export default function HomeStatCard({
  label,
  value,
  unit,
  icon,
}: HomeStatCardProps) {
  const isDiary = icon === "diary"

  const iconSrc = isDiary ? editIcon : arrowIcon

  return (
    <article className="relative flex h-[82px] min-w-0 flex-1 items-center justify-between overflow-hidden rounded-[24px] bg-white px-[18px] shadow-[0_4px_16px_rgba(63,38,107,0.08)]">
      <div className="relative z-10">
        <p className="text-footnote font-normal text-grey-600">
          {label}
        </p>

        <p className="mt-2 flex items-center gap-1 whitespace-nowrap">
          <strong className="text-title1 font-semibold leading-none text-main-500">
            {value}
          </strong>

          <span className="text-headline font-normal leading-none text-black">
            {unit}
          </span>
        </p>
      </div>

      <div className="absolute -bottom-1 right-1 flex h-[70px] w-[70px] rotate-[-10deg] items-center justify-center">
        <img
            src={iconSrc}
            alt=""
            className="h-[70px] w-[70px] rotate-[10deg]"
        />
      </div>
    </article>
  )
}