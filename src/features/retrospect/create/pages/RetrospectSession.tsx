// react
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// components
import AiMessage from '@/features/retrospect/create/components/AiMessage'
import UserMessage from '@/features/retrospect/create/components/UserMessage'
import Modal from '@/shared/components/Modal'
import RetrospectStartModal from '@/features/retrospect/create/components/RetrospectStartModal'

// api
import { subscribeDiarySSE } from '@/features/retrospect/create/api/diarySSE'
import {
  getCurrentQuestion,
  getAnswers,
  uploadAnswer,
  pauseDiary,
  toAbsoluteAudioUrl,
} from '@/features/retrospect/create/api/diaryApi'

// types
import type {
  ReflectionUiState,
  SseEnvelope,
  SseQuestionReadyData,
  SseAnswerTranscribedData,
  SseAnswerCorrectedData,
} from '@/features/retrospect/create/types'

// assets
import speakIcon from '@/assets/icons/mic_regular.svg'
import checkIcon from '@/assets/icons/check_regular.svg'
import speakingGif from '@/assets/speaking.gif'

interface QnaItem {
  questionId: number
  questionOrder: number
  questionText: string
  koreanTranslation: string
  originalText: string | null
  correctedText: string | null
  correctionReason: string | null
}

export default function RetrospectSession() {
  const navigate = useNavigate()
  const { diaryId: diaryIdParam } = useParams<{ diaryId: string }>()
  const diaryId = Number(diaryIdParam)

  const [isStartModalOpen, setIsStartModalOpen] = useState(true)
  const [isStopModalOpen, setIsStopModalOpen] = useState(false)
  const [uiState, setUiState] = useState<ReflectionUiState>('INITIALIZING')
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null)
  const [qnaList, setQnaList] = useState<QnaItem[]>([])

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<BlobPart[]>([])
  const pendingBlobRef = useRef<Blob | null>(null)
  const sseAbortRef = useRef<AbortController | null>(null)

  const uiStateRef = useRef(uiState)
  useEffect(() => { uiStateRef.current = uiState }, [uiState])

  const upsertQna = (item: Partial<QnaItem> & { questionId: number }) => {
    setQnaList(prev => {
      const index = prev.findIndex(q => q.questionId === item.questionId)
      if (index >= 0) {
        const next = [...prev]
        next[index] = { ...next[index], ...item }
        return next
      }
      return [...prev, {
        questionId: item.questionId,
        questionOrder: item.questionOrder ?? Number.MAX_SAFE_INTEGER,
        questionText: item.questionText ?? '',
        koreanTranslation: item.koreanTranslation ?? '',
        originalText: item.originalText ?? null,
        correctedText: item.correctedText ?? null,
        correctionReason: item.correctionReason ?? null,
      }]
    })
  }

  const playQuestion = async (audioUrl: string) => {
    audioRef.current?.pause()
    setUiState('AI_SPEAKING')

    const audio = new Audio(toAbsoluteAudioUrl(audioUrl))
    audioRef.current = audio

    try {
      await audio.play()
      await new Promise<void>((resolve, reject) => {
        audio.onended = () => resolve()
        audio.onerror = () => reject(new Error('음성 재생 실패'))
      })
      setUiState('READY_TO_RECORD')
    } catch {
      setUiState('READY_TO_RECORD')
    }
  }

  const handleSseMessage = (eventName: string, envelope: SseEnvelope) => {
    switch (eventName) {
      case 'question.ready':
      case 'follow-up.ready': {
        const data = envelope.data as SseQuestionReadyData
        setCurrentQuestionId(data.questionId)
        upsertQna({
          questionId: data.questionId,
          questionText: data.questionText,
          koreanTranslation: data.koreanTranslation,
        })
        void playQuestion(data.audioUrl)
        break
      }
      case 'answer.transcribed': {
        const data = envelope.data as SseAnswerTranscribedData
        upsertQna({ questionId: data.questionId, originalText: data.originalText })
        break
      }
      case 'answer.corrected': {
        const data = envelope.data as SseAnswerCorrectedData
        upsertQna({
          questionId: data.questionId,
          correctedText: data.correctedText,
          correctionReason: data.correctionReason,
        })
        break
      }
      case 'processing_failed':
        void syncCurrentQuestion()
        break
      case 'ready-to-complete':
        setUiState('READY_TO_COMPLETE')
        navigate(`/retrospect-memo/${diaryId}`)
        break
    }
  }

  const handleSseMessageRef = useRef(handleSseMessage)
  useEffect(() => { handleSseMessageRef.current = handleSseMessage })

  const syncCurrentQuestion = async () => {
    try {
      const res = await getCurrentQuestion(diaryId)
      if (res.status === 'READY_TO_COMPLETE') {
        navigate(`/retrospect-memo/${diaryId}`)
      } else if (res.status === 'QUESTION_READY' && res.question?.ttsAudioUrl) {
        setCurrentQuestionId(res.question.questionId)
        upsertQna({
          questionId: res.question.questionId,
          questionOrder: res.question.questionOrder,
          questionText: res.question.questionText,
          koreanTranslation: res.question.koreanTranslation,
        })
        void playQuestion(res.question.ttsAudioUrl)
      } else {
        setUiState('PROCESSING')
      }
    } catch {
      setUiState('ERROR')
    }
  }

  const loadPreviousAnswers = async () => {
    try {
      const res = await getAnswers(diaryId)
      res.answers.forEach(answer => {
        upsertQna({
          questionId: answer.questionId,
          questionOrder: answer.questionOrder,
          questionText: answer.questionText,
          koreanTranslation: answer.koreanTranslation,
          originalText: answer.originalText || null,
          correctedText: answer.correctedText || null,
          correctionReason: answer.correctionReason || null,
        })
      })
    } catch { /* 무시 */ }
  }

  const handleStart = () => {
    setIsStartModalOpen(false)
    void loadPreviousAnswers()
    void syncCurrentQuestion()
  }

  useEffect(() => {
    if (!diaryId) return

    let aborted = false
    let controller: AbortController | null = null

    const timer = setTimeout(() => {
      if (aborted) return
      controller = subscribeDiarySSE(diaryId, {
        onMessage: (eventName, envelope) => {
          if (!aborted) handleSseMessageRef.current(eventName, envelope)
        },
        onError: async () => {
          if (aborted) return
          try {
            const res = await getCurrentQuestion(diaryId)
            if (res.status === 'READY_TO_COMPLETE') {
              navigate(`/retrospect-memo/${diaryId}`)
            } else if (res.status === 'QUESTION_READY' && res.question?.ttsAudioUrl) {
              setCurrentQuestionId(res.question.questionId)
              upsertQna({
                questionId: res.question.questionId,
                questionText: res.question.questionText,
                koreanTranslation: res.question.koreanTranslation,
              })
              void playQuestion(res.question.ttsAudioUrl)
            }
          } catch { /* 재연결 대기 */ }
        },
      })
      sseAbortRef.current = controller
    }, 200)

    return () => {
      aborted = true
      clearTimeout(timer)
      controller?.abort()
      audioRef.current?.pause()
      recorderRef.current?.stop()
    }
  }, [diaryId])

  const startRecording = async () => {
    if (uiStateRef.current !== 'READY_TO_RECORD') return

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      chunksRef.current = []
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' })

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      recorder.onstop = () => {
        stream.getTracks().forEach(t => t.stop())
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        pendingBlobRef.current = blob
        setUiState('RECORDED')
      }

      recorder.start()
      recorderRef.current = recorder
      setUiState('RECORDING')
    } catch {
      setUiState('ERROR')
    }
  }

  const finishRecording = () => {
    if (uiStateRef.current !== 'RECORDING') return
    recorderRef.current?.stop()
  }

  const confirmUpload = async () => {
    const blob = pendingBlobRef.current
    if (!currentQuestionId || !blob) return
    if (blob.size > 10 * 1024 * 1024) {
      setUiState('ERROR')
      return
    }
    pendingBlobRef.current = null
    setUiState('UPLOADING')
    try {
      await uploadAnswer(diaryId, currentQuestionId, blob)
      setUiState('PROCESSING')
    } catch {
      setUiState('ERROR')
    }
  }

  const handleMicClick = () => {
    if (uiState === 'READY_TO_RECORD') void startRecording()
    else if (uiState === 'RECORDING') finishRecording()
    else if (uiState === 'RECORDED') void confirmUpload()
  }

  const handleStop = async () => {
    try { await pauseDiary(diaryId) } catch { /* 무시 */ }
    navigate('/home')
  }

  const isMicDisabled = !['READY_TO_RECORD', 'RECORDING', 'RECORDED'].includes(uiState)
  const isAiSpeaking = uiState === 'AI_SPEAKING'

  return (
    <div className="min-h-screen pt-[62px]" style={{ background: 'linear-gradient(to bottom, #202939, #000000)' }}>
      <div className="flex flex-col gap-4 pb-[120px]">
        {[...qnaList].sort((a, b) => a.questionOrder - b.questionOrder).map((item, index, sorted) => {
          const isCurrentQuestion = currentQuestionId === item.questionId
          const isLastQuestion = index === sorted.length - 1
          // 현재 질문 처리 중이거나, 다음 질문이 이미 왔는데 아직 originalText가 없는 경우
          const isPenultimateQuestion = index === sorted.length - 2
          const showLoading = !item.originalText && (
            (isCurrentQuestion && (uiState === 'UPLOADING' || uiState === 'PROCESSING'))
            || isPenultimateQuestion
          )
          return (
            <div key={item.questionId}>
              <AiMessage
                questionText={item.questionText}
                koreanTranslation={item.koreanTranslation}
                isSpeaking={isAiSpeaking && isCurrentQuestion}
              />
              {item.originalText ? (
                <div className="mt-4">
                  <UserMessage
                    originalText={item.originalText}
                    correctedText={item.correctedText}
                    correctionReason={item.correctionReason}
                  />
                </div>
              ) : showLoading && (
                <div className="mt-4 w-full pr-4 pl-20">
                  <div className="p-4 bg-main-500/30 rounded-[24px]">
                    <div className="flex gap-1 items-center h-5">
                      <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="fixed z-10 bottom-[34px] left-0 right-0 px-4 flex items-center">
        <button
          onClick={() => setIsStopModalOpen(true)}
          className="w-[74px] h-[42px] bg-error-100 text-error-500 text-[14px] font-semibold rounded-[100px] hover:bg-error-200"
        >
          종료
        </button>

        {uiState === 'RECORDING' && (
          <img src={speakingGif} alt="" className="absolute -top-[120px] left-1/2 -translate-x-1/2" />
        )}

        <button
          onClick={handleMicClick}
          disabled={isMicDisabled}
          className="absolute left-1/2 -translate-x-1/2 flex justify-center items-center w-[60px] h-[60px] rounded-[100px]"
          style={{
            background: isMicDisabled
              ? 'linear-gradient(to bottom, #A6B2BF, #697586)'
              : 'linear-gradient(to bottom, #A487D4, #643DA8)',
          }}
        >
          {uiState === 'RECORDED'
            ? <img src={checkIcon} alt="전송" />
            : <img src={speakIcon} alt="녹음" />
          }
        </button>
      </div>

      {isStartModalOpen && (
        <RetrospectStartModal onStart={handleStart} />
      )}

      {isStopModalOpen && (
        <Modal
          mainText="회고를 종료할까요?"
          subText={"지금까지 나눈 대화는 저장되지만,\n오늘 회고는 여기서 끝나요."}
          leftButtonText="계속하기"
          rightButtonText="종료하기"
          onLeftClick={() => setIsStopModalOpen(false)}
          onRightClick={handleStop}
        />
      )}
    </div>
  )
}
