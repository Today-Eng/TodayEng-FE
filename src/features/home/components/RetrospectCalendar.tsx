import CalendarDay from '@/features/home/components/CalendarDay';
import MaterialIcon from '@/features/home/components/icons/MaterialIcon';

import RetrospectPreview from '@/shared/components/RetrospectPreview';
import PrevArrowIcon from '@/shared/components/icons/ArrowLeftIcon';
import NextArrowIcon from '@/shared/components/icons/ArrowRightIcon';

import homeMicro from '@/assets/icons/home/home-microphone.svg';
import homeRetro from '@/assets/icons/home/home-retrospect.svg';
import homeInprogress from '@/assets/icons/home/home-inprogress.svg';

import {
  createCalendarDays,
  formatSelectedDate,
  getDayOfWeekFromDate,
  getKoreanDayOfWeek,
} from '@/features/home/utils/calendar';

import type { CalendarDayStatus, HomeDateData, RetrospectPreviewData } from '@/features/home/types';

interface RetrospectCalendarProps {
  year: number;
  month: number;
  today: string;

  selectedDate: string | null;
  selectedDiary: HomeDateData | undefined;

  isSelectedDateExpired: boolean;
  isDateLoading: boolean;
  isDateError: boolean;

  getDateStatus: (date: string) => CalendarDayStatus;

  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onDateSelect: (date: string) => void;
  onRetrospect: () => void;
  onRetrospectDetail: (diaryId: number) => void;
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function RetrospectCalendar({
  year,
  month,
  today,
  selectedDate,
  selectedDiary,
  isSelectedDateExpired,
  isDateLoading,
  isDateError,
  getDateStatus,
  onPreviousMonth,
  onNextMonth,
  onDateSelect,
  onRetrospect,
  onRetrospectDetail,
}: RetrospectCalendarProps) {
  const days = createCalendarDays(year, month);

  const selectedRetrospect: RetrospectPreviewData | null =
    selectedDiary?.diaryStatus === 'COMPLETED' && selectedDiary.diaryId !== undefined
      ? {
          diaryId: selectedDiary.diaryId,
          date: selectedDiary.diaryDate,
          dayOfWeek: selectedDiary.dayOfWeek,
          keywords: selectedDiary.keywords,
          firstQuestion: selectedDiary.questionText ?? '',
          firstAnswer: selectedDiary.correctedText ?? '',
        }
      : null;

  const selectedDayOfWeek = selectedDate
    ? (selectedDiary?.dayOfWeek ?? getDayOfWeekFromDate(selectedDate))
    : null;

  const diaryStatus = selectedDiary?.diaryStatus;

  const isWritable = diaryStatus === 'NOT_STARTED';

  const isInProgress = diaryStatus === 'IN_PROGRESS';

  const isUnavailable = diaryStatus === 'UNAVAILABLE';

  return (
    <section
      className="
        rounded-[24px]
        bg-white
        px-6
        pb-6
        pt-4
        shadow-[0_5px_18px_rgba(63,38,107,0.10)]
      "
    >
      <header className="mt-2 flex items-center justify-between">
        <h2 className="text-headline font-semibold text-black">
          {year}년 {month}월
        </h2>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onPreviousMonth}
            aria-label="이전 달"
            className="flex h-6 w-6 items-center justify-center"
          >
            <PrevArrowIcon />
          </button>

          <button
            type="button"
            onClick={onNextMonth}
            aria-label="다음 달"
            className="flex h-6 w-6 items-center justify-center"
          >
            <NextArrowIcon />
          </button>
        </div>
      </header>

      <div className="mt-4 border-t border-[#E4E5E7] pt-4">
        <div className="grid grid-cols-[repeat(7,28px)] justify-between">
          {WEEKDAYS.map((weekday) => (
            <div
              key={weekday}
              className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  text-caption2
                  font-normal
                  text-grey-500
                "
            >
              {weekday}
            </div>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-[repeat(7,28px)] justify-between gap-y-3">
          {days.map((item, index) => {
            if (!item) {
              return <div key={`empty-${index}`} className="h-7 w-7" />;
            }

            return (
              <CalendarDay
                key={item.date}
                day={item.day}
                date={item.date}
                status={getDateStatus(item.date)}
                selected={selectedDate === item.date}
                isToday={today === item.date}
                onClick={onDateSelect}
              />
            );
          })}
        </div>
      </div>

      {selectedDate && selectedDayOfWeek && (
        <div className="mt-4 border-t border-[#E4E5E7] pt-4">
          {selectedRetrospect ? (
            <RetrospectPreview diary={selectedRetrospect} onDetailClick={onRetrospectDetail} />
          ) : (
            <>
              <div className="flex items-center gap-[6px]">
                <strong className="text-subheadline font-semibold text-black">
                  {formatSelectedDate(selectedDate)}
                </strong>

                <span className="text-footnote font-normal text-grey-600">
                  {getKoreanDayOfWeek(selectedDayOfWeek)}
                </span>
              </div>

              {isDateLoading && (
                <div
                  className="
                      mt-2
                      flex
                      min-h-[82px]
                      items-center
                      justify-center
                      rounded-[38px]
                      bg-grey-50
                      px-6
                      py-2
                      text-center
                    "
                >
                  <p className="text-footnote font-normal text-grey-500">
                    회고 정보를 불러오는 중이에요
                  </p>
                </div>
              )}

              {!isDateLoading && isDateError && (
                <div
                  className="
                        mt-2
                        flex
                        min-h-[82px]
                        items-center
                        justify-center
                        rounded-[38px]
                        bg-grey-50
                        px-6
                        py-2
                        text-center
                      "
                >
                  <p className="text-footnote font-normal text-grey-500">
                    회고 정보를 불러오지 못했어요
                  </p>
                </div>
              )}

              {!isDateLoading && !isDateError && isWritable && (
                <div className="mt-2">
                  <div
                    className="
                          flex
                          h-9
                          items-center
                          justify-center
                          gap-1
                          rounded-full
                          bg-grey-50
                          px-3
                          text-footnote
                          text-grey-600
                        "
                  >
                    <img src={homeMicro} alt="" className="h-[18px] w-[18px]" />
                    영어로 질문에 답하며 하루를 정리해보세요
                  </div>

                  <button
                    type="button"
                    onClick={onRetrospect}
                    className="
                          mt-2
                          flex
                          h-[42px]
                          w-full
                          items-center
                          justify-center
                          gap-2
                          rounded-full
                          bg-[linear-gradient(180deg,rgba(119,76,190,0.9)_0%,#774CBE_100%)]
                          px-4
                          text-[14px]
                          font-semibold
                          leading-none
                          text-white
                        "
                  >
                    <span>회고하기</span>

                    <img src={homeRetro} alt="" className="h-[19px] w-[18px] shrink-0" />
                  </button>
                </div>
              )}

              {!isDateLoading && !isDateError && isInProgress && (
                <div className="mt-2">
                  <div
                    className="
                          flex
                          flex-col
                          items-center
                          rounded-full
                          bg-grey-50
                          px-[24px]
                          py-2
                          gap-1
                          text-footnote
                          text-grey-500
                        "
                  >
                    <MaterialIcon type="time" active={false} />
                    <p>24시간 내에 이어서 작성해야 회고록에 보관돼요.</p>
                  </div>

                  <button
                    type="button"
                    onClick={onRetrospect}
                    className="
                          mt-2
                          flex
                          h-[42px]
                          w-full
                          items-center
                          justify-center
                          gap-2
                          rounded-full
                          bg-warning-100
                          px-4
                          text-[14px]
                          font-semibold
                          leading-none
                          text-warning-500
                        "
                  >
                    <span>회고 이어서 하기</span>

                    <img src={homeInprogress} alt="" className="h-[19px] w-[18px] shrink-0" />
                  </button>
                </div>
              )}

              {!isDateLoading && !isDateError && isSelectedDateExpired && (
                <div
                  className="
                        mt-2
                        flex
                        min-h-[82px]
                        flex-col
                        items-center
                        justify-center
                        rounded-[38px]
                        bg-grey-50
                        px-6
                        py-2
                        text-center
                      "
                >
                  <MaterialIcon type="time" active={false} />

                  <p className="mt-1 text-subheadline font-semibold text-grey-600">
                    회고 기간이 지났어요
                  </p>

                  <p className="mt-1 text-footnote font-normal text-grey-500">
                    7일이 지나면 그날의 기록을 남길 수 없어요
                  </p>
                </div>
              )}

              {!isDateLoading && !isDateError && isUnavailable && (
                <div
                  className="
                        mt-2
                        flex
                        min-h-[82px]
                        flex-col
                        items-center
                        justify-center
                        rounded-[38px]
                        bg-grey-50
                        px-6
                        py-2
                        text-center
                      "
                >
                  <MaterialIcon type="time" active={false} />

                  <p className="mt-1 text-subheadline font-semibold text-grey-600">
                    다시 작성할 수 없는 날짜예요
                  </p>

                  <p className="mt-1 text-footnote font-normal text-grey-500">
                    한 번 회고를 작성한 날짜는 삭제해도 다시 작성할 수 없어요.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}
