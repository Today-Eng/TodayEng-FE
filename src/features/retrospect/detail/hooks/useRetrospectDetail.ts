import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useRetrospectDetailQuery } from '@/features/retrospect/detail/queries';

import type {
  RetrospectQuestionAnswer,
  RetrospectViewMode,
} from '@/features/retrospect/detail/types';

export default function useRetrospectDetail() {
  const { diaryId } = useParams();

  const parsedDiaryId = Number(diaryId);

  const {
    data: retrospect,
    isLoading,
    isError,
  } = useRetrospectDetailQuery(
    parsedDiaryId,
  );

  const [viewMode, setViewMode] =
    useState<RetrospectViewMode>(
      'CORRECTED',
    );

  const [
    translationTarget,
    setTranslationTarget,
  ] =
    useState<RetrospectQuestionAnswer | null>(
      null,
    );

  const [
    explanationTarget,
    setExplanationTarget,
  ] =
    useState<RetrospectQuestionAnswer | null>(
      null,
    );

  const handleViewModeChange = (
    mode: RetrospectViewMode,
  ) => {
    setViewMode(mode);
  };

  const handleTranslationOpen = (
    qa: RetrospectQuestionAnswer,
  ) => {
    setTranslationTarget(qa);
  };

  const handleTranslationClose = () => {
    setTranslationTarget(null);
  };

  const handleExplanationOpen = (
    qa: RetrospectQuestionAnswer,
  ) => {
    setExplanationTarget(qa);
  };

  const handleExplanationClose = () => {
    setExplanationTarget(null);
  };

  return {
    retrospect,

    isLoading,
    isError,

    viewMode,
    translationTarget,
    explanationTarget,

    handleViewModeChange,
    handleTranslationOpen,
    handleTranslationClose,
    handleExplanationOpen,
    handleExplanationClose,
  };
}