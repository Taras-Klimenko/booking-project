import { isRichHtml, sanitizeRichText } from "@/lib/rich-text";

export default function RichText({ content }: { content: string }) {
  if (!content.trim()) return null;

  if (!isRichHtml(content)) {
    return (
      <p className="whitespace-pre-wrap text-sage-700">{content}</p>
    );
  }

  const html = sanitizeRichText(content);

  return (
    <div
      className="rich-text text-sage-700"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
