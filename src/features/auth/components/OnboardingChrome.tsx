interface OnboardingProgressProps {
  currentStep: number;
  totalSteps?: number;
}

export function OnboardingProgress({ currentStep, totalSteps = 4 }: OnboardingProgressProps) {
  return (
    <div
      className="flex w-full gap-3"
      role="progressbar"
      aria-label="온보딩 진행률"
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-valuenow={currentStep}
    >
      {Array.from({ length: totalSteps }, (_, index) => (
        <span
          key={index}
          className={`h-1.5 flex-1 rounded-full ${
            index < currentStep ? 'bg-main-500' : 'bg-grey-100'
          }`}
        />
      ))}
    </div>
  );
}

