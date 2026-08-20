import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "h2",
  "h3",
  "ul",
  "ol",
  "li",
  "blockquote",
];

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

export function sanitizeRichText(html: string) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: [],
  });
}
