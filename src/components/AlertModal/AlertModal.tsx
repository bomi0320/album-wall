type AlertModalProps = {
  message: string;
  type: 'alert' | 'confirm';
  onClose: () => void;
  onConfirm?: () => void;
};

export default function AlertModal({
  message,
  type,
  onClose,
  onConfirm,
}: AlertModalProps) {
  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <div
      className="
        fixed inset-0 z-[200]
        flex items-center justify-center
        bg-black/30
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-[360px]
          rounded-2xl
          border border-gallery-border
          bg-gallery-panel/95
          p-6
          shadow-gallery
          backdrop-blur-md
        "
      >
        <p className="text-center text-sm text-text-primary">
          {message}
        </p>

        {type === 'alert' ? (
          <button
            type="button"
            onClick={onClose}
            className="
            mt-6 w-full rounded-xl
            bg-primary px-3 py-2.5
            text-xs font-semibold text-white
            transition-colors
            hover:bg-primary-hover
          "
          >
            확인
          </button>
        ) : (
          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="
                w-full rounded-xl
                border border-gallery-border
                bg-transparent px-3 py-2.5
                text-xs font-medium text-text-secondary
                transition-colors
                hover:bg-primary-soft
                hover:text-text-primary
              "
            >
              취소
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              className="
                w-full rounded-xl
                bg-primary px-3 py-2.5
                text-xs font-semibold text-white
                transition-colors
                hover:bg-primary-hover
              "
            >
              확인
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
