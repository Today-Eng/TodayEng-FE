import ToggleSwitch from '@/features/mypage/components/ToggleSwitch';

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

      <ToggleSwitch checked={enabled} label="매일 밤 10시 알림" onChange={onToggle} />
    </div>
  );
}
