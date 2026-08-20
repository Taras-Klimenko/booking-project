const ALLOWED_TAGS = new Set([
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
]);

/**
 * Lightweight HTML allowlist sanitizer for Tiptap output.
 * Avoids isomorphic-dompurify/jsdom, which crashes in Vercel serverless.
 */
export function sanitizeRichText(html: string) {
  if (!html) return "";

  // Drop scripts/styles and HTML comments entirely.
  let cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");

  // Remove disallowed tags (keep inner text) and strip all attributes.
  cleaned = cleaned.replace(
    /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*\/?>/g,
    (match, rawTag: string) => {
      const tag = rawTag.toLowerCase();
      if (!ALLOWED_TAGS.has(tag)) return "";

      if (tag === "br") return "<br>";
      if (match.startsWith("</")) return `</${tag}>`;
      return `<${tag}>`;
    },
  );

  return cleaned.trim();
}
