import ArrowRightIcon from '@/shared/components/icons/ArrowRightIcon';

interface MyPageMenuItemProps {
  label: string;
  tone?: 'default' | 'danger';
  showArrow?: boolean;
  onClick?: () => void;
}

export default function MyPageMenuItem({
  label,
  tone = 'default',
  showArrow = true,
  onClick,
}: MyPageMenuItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'flex h-[70px] w-full items-center justify-between px-4 text-left text-headline',
        tone === 'danger' ? 'text-error-500' : 'text-black',
      ].join(' ')}
    >
      <span>{label}</span>
      {showArrow && <ArrowRightIcon />}
    </button>
  );
}
