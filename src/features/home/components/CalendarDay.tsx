import type { CalendarDayStatus } from '@/features/home/types';
import CalendarWrittenMarker from '@/features/home/components/WrittenMarker';

interface CalendarDayProps {
  day: number;
  date: string;
  status: CalendarDayStatus;
  selected: boolean;
  isToday: boolean;
  onClick: (date: string) => void;
}

export default function CalendarDay({
  day,
  date,
  status,
  selected,
  isToday,
  onClick,
}: CalendarDayProps) {
  const hasDiary = status === 'WRITTEN';
  const isFuture = status === 'FUTURE';

  const showMarker = selected || hasDiary;

  const textClassName = (() => {
    if (selected) {
      return 'text-white';
    }

    if (hasDiary) {
      return 'text-main-500';
    }

    if (isFuture) {
      return 'text-grey-300';
    }

    return 'text-grey-900';
  })();

  return (
    <button
      type="button"
      disabled={isFuture}
      onClick={() => onClick(date)}
      aria-label={`${date} 선택`}
      aria-pressed={selected}
      className={[
        'relative flex h-7 w-7 items-center justify-center',
        'disabled:cursor-default',
      ].join(' ')}
    >
      {showMarker && (
        <CalendarWrittenMarker active={selected} />
      )}

      <span
        className={[
          'relative z-10 translate-y-px',
          'flex h-[18px] min-w-4 items-center justify-center',
          'text-footnote font-normal',
          textClassName,
        ].join(' ')}
      >
        {day}
      </span>

      {isToday && (
        <span
          aria-hidden="true"
          className="
            absolute
            -bottom-[8px]
            left-1/2
            h-1
            w-1
            -translate-x-1/2
            rounded-full
            bg-main-500
          "
        />
      )}
    </button>
  );
}