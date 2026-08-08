import BottomNav from '@/shared/components/BottomNav';
import TextLayout from '@/shared/components/TextLayout';

import RetrospectCalendar from '@/features/home/components/RetrospectCalendar';
import HomeStatistics from '@/features/home/components/HomeStatistics';
import TodayMaterials from '@/features/home/components/TodayMaterials';
import useHome from '@/features/home/hooks/useHome';

export default function HomePage() {
  const {
    home,

    currentYear,
    currentMonth,

    selectedDate,
    selectedDiary,

    isSelectedDateExpired,

    isHomeLoading,
    isHomeError,

    isDateLoading,
    isDateError,

    getDateStatus,

    handlePreviousMonth,
    handleNextMonth,
    handleDateSelect,
    handleRetrospect,
    handleRetrospectDetail,
  } = useHome();

  if (isHomeLoading) {
    return (
      <main>
        <div className="px-4 py-6">
          홈 정보를 불러오는 중입니다.
        </div>
      </main>
    );
  }

  if (isHomeError || !home) {
    return (
      <main>
        <div className="px-4 py-6">
          홈 정보를 불러오지 못했습니다.
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-main-100 via-white to-white pb-[110px]">
      <div className="w-full">
        <div className="px-4 pt-[61px]">
          <header>
          <TextLayout
            mainText={`${home.user.nickname}님\n오늘 하루는 어땠나요?`}
          />
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
              selectedDiary={selectedDiary}
              isSelectedDateExpired={
                isSelectedDateExpired
              }
              isDateLoading={isDateLoading}
              isDateError={isDateError}
              getDateStatus={getDateStatus}
              onPreviousMonth={handlePreviousMonth}
              onNextMonth={handleNextMonth}
              onDateSelect={handleDateSelect}
              onRetrospect={handleRetrospect}
              onRetrospectDetail={
                handleRetrospectDetail
              }
            />
          </div>
        </div>

        <div className="mt-5 border-t-8 border-grey-50 px-4 pt-4">
          <TodayMaterials
            materials={home.materials}
          />
        </div>

        <BottomNav />
      </div>
    </main>
  );
}