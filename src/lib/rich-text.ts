export function isRichHtml(content: string) {
  return /<\/?[a-z][\s\S]*>/i.test(content);
}

/** Wrap legacy plain-text descriptions so Tiptap can edit them. */
export function toEditorHtml(content: string) {
  if (!content.trim()) return "";
  if (isRichHtml(content)) return content;

  return content
    .split(/\n\n+/)
    .map((block) => {
      const escaped = block
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>");
      return `<p>${escaped}</p>`;
    })
    .join("");
}
