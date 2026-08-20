"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useRef } from "react";
import { toEditorHtml } from "@/lib/rich-text";

function ToolbarButton({
  onClick,
  active,
  children,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`rounded px-2.5 py-1 text-sm transition-colors ${
        active
          ? "bg-sage-700 text-white"
          : "text-sage-700 hover:bg-sage-100"
      }`}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({
  name,
  defaultValue = "",
  required,
}: {
  name: string;
  defaultValue?: string;
  required?: boolean;
}) {
  const hiddenRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        code: false,
        codeBlock: false,
        horizontalRule: false,
      }),
      Placeholder.configure({
        placeholder: "Подробное описание квартиры…",
      }),
    ],
    content: toEditorHtml(defaultValue),
    editorProps: {
      attributes: {
        class:
          "min-h-[140px] px-4 py-3 focus:outline-none text-sage-800 prose-editor",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    const sync = () => {
      const input = hiddenRef.current;
      if (!input) return;
      input.value = editor.getHTML();
      if (required) {
        input.setCustomValidity(
          editor.getText().trim() ? "" : "Заполните полное описание",
        );
      }
    };

    sync();
    editor.on("update", sync);
    return () => {
      editor.off("update", sync);
    };
  }, [editor, required]);

  return (
    <div className="overflow-hidden rounded-lg border border-sage-300 focus-within:border-sage-600">
      {editor && (
        <div className="flex flex-wrap gap-0.5 border-b border-sage-200 bg-sage-50 px-2 py-1.5">
          <ToolbarButton
            title="Жирный"
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <span className="font-bold">B</span>
          </ToolbarButton>
          <ToolbarButton
            title="Курсив"
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <span className="italic">I</span>
          </ToolbarButton>
          <ToolbarButton
            title="Зачёркнутый"
            active={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <span className="line-through">S</span>
          </ToolbarButton>

          <span className="mx-1 self-center text-sage-300">|</span>

          <ToolbarButton
            title="Обычный текст"
            active={editor.isActive("paragraph")}
            onClick={() => editor.chain().focus().setParagraph().run()}
          >
            Абз
          </ToolbarButton>
          <ToolbarButton
            title="Крупный заголовок"
            active={editor.isActive("heading", { level: 2 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            H2
          </ToolbarButton>
          <ToolbarButton
            title="Средний заголовок"
            active={editor.isActive("heading", { level: 3 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            H3
          </ToolbarButton>

          <span className="mx-1 self-center text-sage-300">|</span>

          <ToolbarButton
            title="Маркированный список"
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            • Список
          </ToolbarButton>
          <ToolbarButton
            title="Нумерованный список"
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            1. Список
          </ToolbarButton>
        </div>
      )}

      <EditorContent editor={editor} />

      <input
        ref={hiddenRef}
        type="hidden"
        name={name}
        defaultValue={toEditorHtml(defaultValue)}
      />
    </div>
  );
}
