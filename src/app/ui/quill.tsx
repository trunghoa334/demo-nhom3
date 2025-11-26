import * as React from "react"
import ReactQuill, { ReactQuillProps } from "react-quill"
import "react-quill/dist/quill.snow.css"

export interface QuillProps extends ReactQuillProps {
  error?: string
  className?: string
}

export const Quill: React.FC<QuillProps> = ({ error, className, ...props }) => {
  const modules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ align: [] }],
      ["link", "image", "video", "formula"],
      ["clean"],
    ],
  }

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "direction",
    "align",
    "link",
    "image",
    "video",
    "formula",
    "clean",
  ]

  return (
    <div className="flex flex-col gap-2">
      <ReactQuill
        theme="snow"
        {...props}
        modules={modules}
        formats={formats}
        className={className}
        style={{ height: "300px" }}
      />
      {error && <span className="titleError">{error}</span>}
    </div>
  )
}
