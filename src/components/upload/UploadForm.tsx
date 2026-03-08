import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import { Spinner } from "../ui/Spinner";
import { ErrorBanner } from "../ui/ErrorBanner";

interface UploadFormProps {
  author: string;
  setAuthor: (v: string) => void;
  caption: string;
  setCaption: (v: string) => void;
  onSubmit: () => void;
  isUploading: boolean;
  submitError: string | null;
}

export function UploadForm({
  author,
  setAuthor,
  caption,
  setCaption,
  onSubmit,
  isUploading,
  submitError,
}: UploadFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        id="author"
        label="Your name"
        placeholder="Jane Doe"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        disabled={isUploading}
        required
      />
      <Textarea
        id="caption"
        label="Caption"
        placeholder="Write a caption…"
        rows={3}
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        disabled={isUploading}
      />

      {submitError && <ErrorBanner message={submitError} />}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isUploading || !author.trim()}
        className="w-full justify-center"
      >
        {isUploading ? (
          <>
            <Spinner size="sm" className="text-white" />
            Uploading…
          </>
        ) : (
          "Share Post"
        )}
      </Button>
    </form>
  );
}
