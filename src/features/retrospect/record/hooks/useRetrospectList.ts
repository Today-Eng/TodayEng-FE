import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { YearMonth } from '@/features/retrospect/record/types';
import { useRetrospectListQuery } from '../queries';

export default function useRetrospectList() {
  const navigate = useNavigate();
  const now = new Date();

const CURRENT_YEAR = now.getFullYear();
const CURRENT_MONTH = now.getMonth() + 1;

const [selectedYear, setSelectedYear] =
  useState(CURRENT_YEAR);

const [selectedMonth, setSelectedMonth] =
  useState(CURRENT_MONTH);

  const [isMonthSheetOpen, setIsMonthSheetOpen] = useState(false);

  const { data } = useRetrospectListQuery(selectedYear, selectedMonth);

  const diaries = data?.diaries ?? [];

  const handlePreviousMonth = () => {
    if (selectedMonth === 1) {
      setSelectedYear((year) => year - 1);
      setSelectedMonth(12);
      return;
    }

    setSelectedMonth((month) => month - 1);
  };

  const handleNextMonth = () => {
    const isCurrentMonth =
      selectedYear === CURRENT_YEAR && selectedMonth === CURRENT_MONTH;

    if (isCurrentMonth) {
      return;
    }

    if (selectedMonth === 12) {
      setSelectedYear((year) => year + 1);
      setSelectedMonth(1);
      return;
    }

    setSelectedMonth((month) => month + 1);
  };

  const handleMonthSheetOpen = () => {
    setIsMonthSheetOpen(true);
  };

  const handleMonthSheetClose = () => {
    setIsMonthSheetOpen(false);
  };

  const handleMonthSelect = ({ year, month }: YearMonth) => {
    setSelectedYear(year);
    setSelectedMonth(month);
    setIsMonthSheetOpen(false);
  };

  const handleDetailClick = (diaryId: number) => {
    navigate(`/retrospects/${diaryId}`);
  };

  return {
    selectedYear,
    selectedMonth,
    currentYear: CURRENT_YEAR,
    currentMonth: CURRENT_MONTH,
    diaries,
    isMonthSheetOpen,
    handlePreviousMonth,
    handleNextMonth,
    handleMonthSheetOpen,
    handleMonthSheetClose,
    handleMonthSelect,
    handleDetailClick,
  };
}
