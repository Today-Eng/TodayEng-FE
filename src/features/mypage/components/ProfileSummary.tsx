import LogoIcon from '@/shared/components/icons/LogoIcon';

interface ProfileSummaryProps {
  nickname: string;
  profileUrl: string | null;
  englishLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  email: string;
}

const LEVEL_LABELS = {
  BEGINNER: '초급',
  INTERMEDIATE: '중급',
  ADVANCED: '고급',
} as const;

export default function ProfileSummary({
  nickname,
  profileUrl,
  englishLevel,
  email,
}: ProfileSummaryProps) {
  return (
    <section className="flex h-[70px] items-center justify-between px-4">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center overflow-hidden rounded-[17px] bg-gradient-to-b from-main-600 to-main-400">
          {profileUrl ? (
            <img
              src={profileUrl}
              alt={`${nickname}님의 프로필`}
              className="h-full w-full object-cover"
            />
          ) : (
            <LogoIcon width={35} height={28} />
          )}
        </div>

        <div className="min-w-0">
          <p className="truncate text-headline font-semibold text-black">{nickname}</p>
          <p className="truncate text-caption1 text-grey-500">{email}</p>
        </div>
      </div>

      <div className="ml-3 flex shrink-0 items-center gap-2">
        <span className="rounded-full bg-main-100 px-1.5 py-1 text-footnote font-semibold text-main-500">
          {LEVEL_LABELS[englishLevel]}
        </span>
        <span className="rounded-full bg-sub-100 px-1.5 py-1 text-footnote font-semibold text-sub-500">
          Level {englishLevel === 'BEGINNER' ? 'A' : englishLevel === 'INTERMEDIATE' ? 'B' : 'C'}
        </span>
      </div>
    </section>
  );
}
