import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  diaryPreviewMock,
  homeMock,
} from "../mocks/homeMock"

import {
  getCalendarDayStatus,
  getNextMonth,
  getPreviousMonth,
} from "../utils/calendar"

import type {
  CalendarDayStatus,
  DiaryPreviewData,
} from "../types"

export default function useHomeMock() {
  const navigate = useNavigate()

  const [currentYear, setCurrentYear] = useState(
    homeMock.calendar.year,
  )

  const [currentMonth, setCurrentMonth] = useState(
    homeMock.calendar.month,
  )

  const [selectedDate, setSelectedDate] = useState(
    homeMock.today.date,
  )

  const selectedDiary = useMemo<DiaryPreviewData | null>(() => {
    return diaryPreviewMock[selectedDate] ?? null
  }, [selectedDate])

  const getDateStatus = (
    date: string,
  ): CalendarDayStatus => {
    return getCalendarDayStatus({
      date,
      today: homeMock.today.date,
      writtenDates: homeMock.calendar.writtenDates,
      writableFrom: homeMock.calendar.writableFrom,
      writableTo: homeMock.calendar.writableTo,
    })
  }

  const handlePreviousMonth = () => {
    const previous = getPreviousMonth(
      currentYear,
      currentMonth,
    )

    setCurrentYear(previous.year)
    setCurrentMonth(previous.month)
  }

  const handleNextMonth = () => {
    const next = getNextMonth(currentYear, currentMonth)

    const nextCalendarValue =
      next.year * 12 + next.month

    const todayCalendarValue =
      homeMock.calendar.year * 12 +
      homeMock.calendar.month

    if (nextCalendarValue > todayCalendarValue) {
      return
    }

    setCurrentYear(next.year)
    setCurrentMonth(next.month)
  }

  const handleDateSelect = (date: string) => {
    const status = getDateStatus(date)

    if (status === "FUTURE") {
      return
    }

    setSelectedDate(date)
  }

  const handleRetrospect = () => {
    const status = getDateStatus(selectedDate)

    if (
      status !== "TODAY" &&
      status !== "WRITABLE"
    ) {
      return
    }

    navigate(`/retrospect?date=${selectedDate}`)
  }

  const handleDiaryDetail = (diaryId: number) => {
    navigate(`/diaries/${diaryId}`)
  }

  return {
    home: homeMock,
    currentYear,
    currentMonth,
    selectedDate,
    selectedDiary,
    getDateStatus,
    handlePreviousMonth,
    handleNextMonth,
    handleDateSelect,
    handleRetrospect,
    handleDiaryDetail,
  }
}