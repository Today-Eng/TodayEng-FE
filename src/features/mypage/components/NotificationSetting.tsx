interface NotificationSettingProps {
  enabled: boolean;
  onToggle: () => void;
}

export default function NotificationSetting({ enabled, onToggle }: NotificationSettingProps) {
  return (
    <div className="flex min-h-[78px] items-center justify-between px-4">
      <div>
        <p className="text-body text-black">알림 설정</p>
        <p className="mt-1 text-caption1 text-grey-500">매일 밤 10시에 알림을 보내드려요</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label="매일 밤 10시 알림"
        onClick={onToggle}
        className={[
          'relative h-[22px] w-[58px] rounded-full transition-colors',
          enabled ? 'bg-main-500' : 'bg-grey-300',
        ].join(' ')}
      >
        <span
          className={[
            'absolute top-0.5 h-[18px] w-[30px] rounded-full bg-white transition-transform',
            enabled ? 'translate-x-[26px]' : 'translate-x-0.5',
          ].join(' ')}
        />
      </button>
    </div>
  );
}
