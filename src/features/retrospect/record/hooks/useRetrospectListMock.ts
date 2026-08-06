import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

import { retrospectListMock } from "@/features/retrospect/record/mocks/retrospectListMock"

import type { RetrospectPreviewData } from "@/shared/types/retrospect"
import type { YearMonth } from "@/features/retrospect/record/types"

const MOCK_CURRENT_YEAR = 2026
const MOCK_CURRENT_MONTH = 7

export default function useRetrospectListMock() {
  const navigate = useNavigate()

  const [selectedYear, setSelectedYear] =
    useState(MOCK_CURRENT_YEAR)

  const [selectedMonth, setSelectedMonth] =
    useState(MOCK_CURRENT_MONTH)

  const [isMonthSheetOpen, setIsMonthSheetOpen] =
    useState(false)

  const diaries =
    useMemo<RetrospectPreviewData[]>(() => {
      const selectedData =
        retrospectListMock.find(
          (item) =>
            item.year === selectedYear &&
            item.month === selectedMonth,
        )

      return selectedData?.diaries ?? []
    }, [selectedYear, selectedMonth])

  const handlePreviousMonth = () => {
    if (selectedMonth === 1) {
      setSelectedYear((year) => year - 1)
      setSelectedMonth(12)
      return
    }

    setSelectedMonth((month) => month - 1)
  }

  const handleNextMonth = () => {
    const isCurrentMonth =
      selectedYear === MOCK_CURRENT_YEAR &&
      selectedMonth === MOCK_CURRENT_MONTH

    if (isCurrentMonth) {
      return
    }

    if (selectedMonth === 12) {
      setSelectedYear((year) => year + 1)
      setSelectedMonth(1)
      return
    }

    setSelectedMonth((month) => month + 1)
  }

  const handleMonthSheetOpen = () => {
    setIsMonthSheetOpen(true)
  }

  const handleMonthSheetClose = () => {
    setIsMonthSheetOpen(false)
  }

  const handleMonthSelect = ({
    year,
    month,
  }: YearMonth) => {
    setSelectedYear(year)
    setSelectedMonth(month)
    setIsMonthSheetOpen(false)
  }

  const handleDetailClick = (
    diaryId: number,
  ) => {
    navigate(`/retrospects/${diaryId}`)
  }

  return {
    selectedYear,
    selectedMonth,
    currentYear: MOCK_CURRENT_YEAR,
    currentMonth: MOCK_CURRENT_MONTH,
    diaries,
    isMonthSheetOpen,
    handlePreviousMonth,
    handleNextMonth,
    handleMonthSheetOpen,
    handleMonthSheetClose,
    handleMonthSelect,
    handleDetailClick,
  }
}