import HomeStatCard from "@/features/home/components/HomeStatCard"

interface HomeStatisticsProps {
  totalDiaryCount: number
  currentDiaryStreak: number
}

export default function HomeStatistics({
  totalDiaryCount,
  currentDiaryStreak,
}: HomeStatisticsProps) {
  return (
    <section className="flex gap-4">
      <HomeStatCard
        label="총 작성"
        value={totalDiaryCount}
        unit="편"
        icon="diary"
      />

      <HomeStatCard
        label="연속 업로드"
        value={currentDiaryStreak}
        unit="일"
        icon="streak"
      />
    </section>
  )
}