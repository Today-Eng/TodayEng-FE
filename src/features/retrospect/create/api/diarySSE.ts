import { fetchEventSource } from '@microsoft/fetch-event-source';
import { getAccessToken } from '@/features/auth/session';
import type { SseEnvelope } from '@/features/retrospect/create/types';

const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080').replace(/\/$/, '');

export interface DiarySSEHandlers {
  onMessage: (eventName: string, envelope: SseEnvelope) => void;
  onError: (error: unknown) => void;
}

export function subscribeDiarySSE(diaryId: number, handlers: DiarySSEHandlers): AbortController {
  console.log('[SSE] subscribeDiarySSE called, diaryId:', diaryId)
  const controller = new AbortController();
  const token = getAccessToken();

  void fetchEventSource(`${BASE_URL}/diaries/${diaryId}/subscribe`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'text/event-stream',
    },
    signal: controller.signal,
    openWhenHidden: true,
    onopen: async (response) => {
      console.log('[SSE] onopen', response.status, response.ok);
      if (!response.ok) throw new Error(`SSE 연결 실패: ${response.status}`);
    },
    onmessage: (event) => {
      console.log('[SSE] onmessage', event.event, event.data);
      if (!event.data) return;
      try {
        const envelope = JSON.parse(event.data) as SseEnvelope;
        handlers.onMessage(event.event ?? envelope.type, envelope);
      } catch {
        // 파싱 실패한 이벤트 무시
      }
    },
    onerror: (error) => {
      console.log('[SSE] onerror', error);
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw error;
      }
      handlers.onError(error);
      // throw하지 않으면 fetchEventSource가 자동 재연결 시도
    },
  });

  return controller;
}
