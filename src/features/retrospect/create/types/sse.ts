import type { ReflectionSessionQuestion } from '@/features/retrospect/create/types/diary';

export interface SseEnvelope<T = unknown> {
  type: string;
  diaryId: number;
  occurredAt: string;
  data: T;
}

export interface SseConnectedData {
  message: string;
}

export interface SseHeartbeatData {
  message: string;
}

export interface SseQuestionsReadyData {
  questions: ReflectionSessionQuestion[];
}

export interface SseQuestionReadyData {
  questionId: number;
  questionText: string;
  koreanTranslation: string;
  audioUrl: string;
}

export interface SseAnswerTranscribedData {
  questionId: number;
  answerId: number;
  originalText: string;
}

export interface SseAnswerCorrectedData {
  questionId: number;
  answerId: number;
  correctedText: string;
  correctionReason: string;
}

export interface SseReadyToCompleteData {
  diaryId: number;
}

export interface SseProcessingFailedData {
  stage: string;
  errorCode: string;
  message: string;
}
