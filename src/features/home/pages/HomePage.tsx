import RetrospectCalendar from "@/features/home/components/RetrospectCalendar"
import HomeStatistics from "@/features/home/components/HomeStatistics"
import TodayMaterials from "@/features/home/components/TodayMaterials"
import useHomeMock from "@/features/home/hooks/useHomeMock"
import BottomNav from "@/shared/components/BottomNav"

export default function HomePage() {
  const {
    home,
    currentYear,
    currentMonth,
    selectedDate,
    selectedRetrospect,
    getDateStatus,
    handlePreviousMonth,
    handleNextMonth,
    handleDateSelect,
    handleRetrospect,
    handleRetrospectDetail,
  } = useHomeMock()

  return (
    <main className="min-h-screen bg-gradient-to-b from-main-100 via-white to-white pb-[110px]">
      <div className="mx-auto w-full max-w-[402px]">
        <div className="px-4 pt-[61px]">
          <header>
            <div className="text-title1 font-semibold text-black">
              {home.user.nickname}님
              <br />
              오늘 하루는 어땠나요?
            </div>
          </header>

          <div className="mt-4">
            <HomeStatistics
              totalDiaryCount={
                home.statistics.totalDiaryCount
              }
              currentDiaryStreak={
                home.statistics.currentDiaryStreak
              }
            />
          </div>

          <div className="mt-4">
            <RetrospectCalendar
              year={currentYear}
              month={currentMonth}
              today={home.today.date}
              selectedDate={selectedDate}
              selectedRetrospect={selectedRetrospect}
              getDateStatus={getDateStatus}
              onPreviousMonth={handlePreviousMonth}
              onNextMonth={handleNextMonth}
              onDateSelect={handleDateSelect}
              onRetrospect={handleRetrospect}
              onRetrospectDetail={handleRetrospectDetail}
            />
          </div>
        </div>

        <div className="mt-5 border-t-8 border-grey-50 px-4 pt-4">
          <TodayMaterials materials={home.materials} />
        </div>

        <BottomNav />
      </div>
    </main>
  )
}