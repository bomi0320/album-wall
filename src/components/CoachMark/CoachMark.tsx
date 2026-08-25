type CoachMarkProps = {
  step: number;
  onClose: () => void;
};

const steps = [
  {
    title: '앨범을 검색해보세요!',
    description:
      '앨범이나 아티스트 이름을 검색해보세요. 검색 결과가 나타나면 다음 단계로 넘어갈 수 있어요.',
    targetId: 'coach-search',
  },
  {
    title: '액자를 선택해보세요!',
    description:
      '앨범을 전시하고 싶은 위치의 액자를 클릭해보세요. 액자를 선택하면 다음 단계로 넘어갈 수 있어요.',
    targetId: 'coach-frame',
  },
  {
    title: '앨범을 선택해보세요!',
    description:
      '검색 결과에서 앨범을 클릭하면 선택한 액자에 전시됩니다.',
    targetId: 'coach-search-results',
  },
];

export default function CoachMark({
  step,
  onClose,
}: CoachMarkProps) {
  const currentStep = steps[step];

  if (!currentStep) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      {step === 1 ? (
        <div className="pointer-events-none fixed inset-0 z-[100]">
          {/* Top */}
          <div
            className="absolute inset-x-0 top-0 bg-black/30"
            style={{ height: '12%' }}
          />

          {/* Left */}
          <div
            className="absolute left-0 bg-black/30"
            style={{
              top: '12%',
              width: '30%',
              height: '26%',
            }}
          />

          {/* Right */}
          <div
            className="absolute right-0 bg-black/30"
            style={{
              top: '12%',
              width: '30%',
              height: '26%',
            }}
          />

          {/* Bottom */}
          <div
            className="absolute inset-x-0 bottom-0 bg-black/30"
            style={{ height: '62%' }}
          />
        </div>
      ) : (
        <div className="pointer-events-none fixed inset-0 z-[100] bg-black/30" />
      )}

      {/* Coach Mark */}
      <div
        className={`
          fixed z-[110]
          w-[320px]
          rounded-2xl
          border border-gallery-border
          bg-gallery-panel
          p-5
          shadow-2xl
          backdrop-blur-md
          ${
            step === 0
              ? 'left-6 top-[120px]'
              : step === 1
                ? 'right-6 top-1/2 -translate-y-1/2'
                : 'left-[400px] top-[420px]'
          }
        `}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="
            absolute right-3 top-3
            flex h-7 w-7
            items-center justify-center
            rounded-full
            text-lg
            text-text-muted
            transition-colors
            hover:bg-primary-soft
            hover:text-text-primary
          "
          aria-label="튜토리얼 닫기"
        >
          ×
        </button>

        {/* Step */}
        <p
          className="
            mb-2
            text-xs font-medium
            uppercase tracking-[0.12em]
            text-primary
          "
        >
          {step + 1}/{steps.length}
        </p>

        {/* Title */}
        <h2
          className="
            mb-2
            pr-6
            text-base font-semibold
            text-text-primary
          "
        >
          {currentStep.title}
        </h2>

        {/* Description */}
        <p
          className="
            mb-5
            text-sm leading-6
            text-text-secondary
          "
        >
          {currentStep.description}
        </p>
      </div>
    </>
  );
}
