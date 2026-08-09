import BottomNav from "@/shared/components/BottomNav"

import MonthBottomSheet from "@/features/retrospect/record/components/MonthBottomSheet"
import RetrospectCard from "@/features/retrospect/record/components/RetrospectCard"
import RetrospectMonthButton from "@/features/retrospect/record/components/RetrospectMonthButton"
import useRetrospectList from "../hooks/useRetrospectList"

export default function RetrospectListPage() {
  const {
    selectedYear,
    selectedMonth,
    currentYear,
    currentMonth,
    diaries,
    isMonthSheetOpen,
    handlePreviousMonth,
    handleNextMonth,
    handleMonthSheetOpen,
    handleMonthSheetClose,
    handleMonthSelect,
    handleDetailClick,
  } = useRetrospectList()

  const isCurrentMonth =
    selectedYear === currentYear &&
    selectedMonth === currentMonth

  return (
    <div className="min-h-dvh bg-gradient-to-b from-white to-grey-50">
      <main className="min-h-dvh w-full pb-[91px]">
        <header
          className="
            sticky
            top-0
            z-20
            px-4
            pt-[62px]
            bg-white
            pb-2
          "
        >
          <RetrospectMonthButton
            year={selectedYear}
            month={selectedMonth}
            isSheetOpen={isMonthSheetOpen}
            disableNext={isCurrentMonth}
            onPreviousMonth={handlePreviousMonth}
            onNextMonth={handleNextMonth}
            onOpenSheet={handleMonthSheetOpen}
          />
        </header>

        <section className="space-y-4 px-4 pt-2 pb-6 mb-4">
          {diaries.length > 0 ? (
            diaries.map((diary) => (
              <RetrospectCard
                key={diary.diaryId}
                diary={diary}
                onDetailClick={
                  handleDetailClick
                }
              />
            ))
          ) : (
            <div
              className="
                flex
                min-h-[420px]
                flex-col
                items-center
                justify-center
                px-6
                text-center
              "
            >
              <p className="text-subheadline font-semibold text-grey-600">
                작성한 회고가 없어요
              </p>

              <p className="mt-2 text-footnote font-normal text-grey-500">
                이달에 작성한 회고가 여기에 표시돼요
              </p>
            </div>
          )}
        </section>
      </main>

      <BottomNav />

      <MonthBottomSheet
        open={isMonthSheetOpen}
        year={selectedYear}
        month={selectedMonth}
        currentYear={currentYear}
        currentMonth={currentMonth}
        onClose={handleMonthSheetClose}
        onSelect={handleMonthSelect}
      />
    </div>
  )
}