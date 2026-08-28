import { useState } from 'react';

type NameInputProps = {
  initialName?: string;
  onEnter: (name: string) => void;
  onAlert: (message: string) => void;
};

export default function NameInput({
  initialName = '',
  onEnter,
  onAlert,
}: NameInputProps) {
  const [name, setName] = useState(initialName);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      onAlert('이름을 입력해주세요.');
      return;
    }

    onEnter(trimmedName);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gallery-bg px-6">
      <section
        className="
          flex w-full max-w-md flex-col items-center
          rounded-2xl
          border border-gallery-border
          bg-gallery-panel/95
          px-8 py-10
          shadow-gallery
          backdrop-blur-md
        "
      >
        <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
          AlbumWall
        </h1>

        <p className="mt-3 text-center text-sm leading-relaxed text-text-secondary">
          나만의 음악을
          <br />
          갤러리에 전시해보세요.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex w-full flex-col"
        >
          <label
            htmlFor="name"
            className="mb-2 text-xs font-medium text-text-secondary"
          >
            이름
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력해주세요"
            maxLength={20}
            className="
              w-full rounded-xl
              border border-gallery-border
              bg-gallery-bg
              px-4 py-3
              text-sm text-text-primary
              outline-none
              transition-all duration-200
              placeholder:text-text-muted
              focus:border-primary
              focus:ring-2
              focus:ring-primary/10
            "
          />

          <button
            type="submit"
            className="
              mt-4 w-full rounded-xl
              bg-primary
              px-4 py-3
              text-sm font-semibold text-white
              transition-all duration-200
              hover:bg-primary-hover
              active:scale-[0.98]
            "
          >
            갤러리 입장
          </button>
        </form>
      </section>
    </main>
  );
}
