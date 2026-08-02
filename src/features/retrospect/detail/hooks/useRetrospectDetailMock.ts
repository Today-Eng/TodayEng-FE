import { useState } from "react"

import { retrospectDetailMock } from "@/features/retrospect/detail/mocks/retrospectDetailMock"

import type {
  RetrospectQuestionAnswer,
  RetrospectViewMode,
} from "@/features/retrospect/detail/types"

export default function useRetrospectDetailMock() {
  const [viewMode, setViewMode] =
    useState<RetrospectViewMode>(
      "CORRECTED",
    )

  const [
    translationTarget,
    setTranslationTarget,
  ] =
    useState<RetrospectQuestionAnswer | null>(
      null,
    )

  const [
    explanationTarget,
    setExplanationTarget,
  ] =
    useState<RetrospectQuestionAnswer | null>(
      null,
    )

  const handleViewModeChange = (
    mode: RetrospectViewMode,
  ) => {
    setViewMode(mode)
  }

  const handleTranslationOpen = (
    qa: RetrospectQuestionAnswer,
  ) => {
    setTranslationTarget(qa)
  }

  const handleTranslationClose = () => {
    setTranslationTarget(null)
  }

  const handleExplanationOpen = (
    qa: RetrospectQuestionAnswer,
  ) => {
    setExplanationTarget(qa)
  }

  const handleExplanationClose = () => {
    setExplanationTarget(null)
  }

  return {
    retrospect: retrospectDetailMock,
    viewMode,
    translationTarget,
    explanationTarget,
    handleViewModeChange,
    handleTranslationOpen,
    handleTranslationClose,
    handleExplanationOpen,
    handleExplanationClose,
  }
}