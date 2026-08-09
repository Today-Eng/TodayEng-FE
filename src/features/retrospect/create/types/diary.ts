export type ReflectionUiState =
  | 'INITIALIZING'
  | 'AI_SPEAKING'
  | 'READY_TO_RECORD'
  | 'RECORDING'
  | 'RECORDED'
  | 'UPLOADING'
  | 'PROCESSING'
  | 'READY_TO_COMPLETE'
  | 'COMPLETED'
  | 'ERROR';

export type TtsStatus = 'PENDING' | 'PROCESSING' | 'SUCCEEDED' | 'FAILED';
export type TranscriptionStatus = 'UPLOADED' | 'PROCESSING' | 'SUCCEEDED' | 'FAILED';
export type CorrectionStatus = 'PENDING' | 'PROCESSING' | 'SUCCEEDED' | 'FAILED';
export type DiaryStatus = 'IN_PROGRESS' | 'PAUSED' | 'COMPLETED';
export type QuestionGenerationStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

export interface DiaryStartResponse {
  diaryId: number;
  diaryDate: string;
  status: string;
  resumed: boolean;
  createdAt: string;
}

export interface DiaryContext {
  type: string;
  success: boolean;
}

export interface DiaryContextResponse {
  diaryId: number;
  contexts: DiaryContext[];
}

export interface Question {
  questionId: number;
  parentQuestionId: number | null;
  questionType: 'MAIN' | 'FOLLOW_UP';
  questionOrder: number;
  questionText: string;
  koreanTranslation: string;
  ttsStatus: TtsStatus;
  ttsAudioUrl: string | null;
  answerId: number | null;
  transcriptionStatus: TranscriptionStatus | null;
  correctionStatus: CorrectionStatus | null;
}

export interface QuestionsResponse {
  diaryId: number;
  diaryStatus: DiaryStatus;
  questionGenerationStatus: QuestionGenerationStatus;
  questions: Question[];
}

export interface CurrentQuestionResponse {
  status: 'WAITING' | 'QUESTION_READY' | 'READY_TO_COMPLETE';
  question: Question | null;
}

export interface ReflectionSessionQuestion {
  questionId: number;
  order: number;
  questionText: string;
  koreanTranslation: string;
  keyword: string;
  contextId: number;
}

export interface ReflectionSessionResponse {
  diaryId: number;
  questions: ReflectionSessionQuestion[];
}

export interface Answer {
  answerId: number;
  questionId: number;
  questionType: 'MAIN' | 'FOLLOW_UP';
  questionOrder: number;
  questionText: string;
  koreanTranslation: string;
  originalText?: string;
  correctedText?: string;
  correctionReason?: string;
  alternativeExpression?: Record<string, unknown>;
  correctionStatus: CorrectionStatus;
  transcriptionStatus: TranscriptionStatus;
}

export interface AnswersResponse {
  answeredCount: number;
  expectedAnswerCount: number;
  answers: Answer[];
}

export interface AnswerDetail {
  answerId: number;
  questionId: number;
  questionType: 'MAIN' | 'FOLLOW_UP';
  questionOrder: number;
  questionText: string;
  koreanTranslation: string;
  originalText: string | null;
  correctedText: string | null;
  correctionReason: string | null;
  alternativeExpression: Record<string, unknown>;
  correctionStatus: CorrectionStatus;
  transcriptionStatus: TranscriptionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AnswerUploadResponse {
  answerId: number;
  status: TranscriptionStatus;
}

export interface DiaryCompleteResponse {
  diaryId: number;
  status: string;
  finalMemo: string | null;
  completedAt: string;
}
