import type { HomeMaterials } from "@/features/home/types"
import { useNavigate } from "react-router-dom"


import MaterialItem from "@/features/home/components/MaterialItem"

interface TodayMaterialsProps {
  materials: HomeMaterials
}

export default function TodayMaterials({
  materials,
}: TodayMaterialsProps) {
  const calendarActive =
    materials.calendar.connected &&
    materials.calendar.useEnabled &&
    Boolean(
      materials.calendar.representativeEvent,
    )
  const navigate = useNavigate()

  const spotifyActive =
    materials.spotify.connected &&
    materials.spotify.useEnabled &&
    materials.spotify.recentTrackAvailable

  const calendarLabel = calendarActive
    ? materials.calendar.representativeEvent
        ?.title ?? "일정이 있어요"
    : "구글캘린더 연동하기"

  const spotifyLabel = spotifyActive
    ? `${materials.spotify.trackTitle} · ${materials.spotify.artistName}`
    : "스포티파이 연동하기"

  return (
    <section>
      <h2 className="text-headline font-semibold text-black">
        연동된 오늘의 소재
      </h2>

      <div className="mt-4 flex flex-wrap gap-2">
        <MaterialItem
          icon="time"
          label={materials.time.message}
          active
        />

        {materials.weather.available && (
          <MaterialItem
            icon="weather"
            label={`${materials.weather.condition} ${materials.weather.temperature}도`}
            active
          />
        )}

        <MaterialItem
          icon="music"
          label={spotifyLabel}
          active={spotifyActive}
          onClick={
              spotifyActive
              ? undefined
              : () => navigate("/mypage/spotify")
          }
          />

        <MaterialItem
          icon="calendar"
          label={calendarLabel}
          active={calendarActive}
          onClick={
              calendarActive
              ? undefined
              : () => navigate("/mypage/calendar")
          }
        />
      </div>
    </section>
  )
}