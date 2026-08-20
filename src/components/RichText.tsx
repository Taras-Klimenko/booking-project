import { isRichHtml } from "@/lib/rich-text";

export default function RichText({ content }: { content: string }) {
  if (!content.trim()) return null;

  if (!isRichHtml(content)) {
    return (
      <p className="whitespace-pre-wrap text-sage-700">{content}</p>
    );
  }

  return (
    <div
      className="rich-text text-sage-700"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
