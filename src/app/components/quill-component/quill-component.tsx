/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller, FieldErrors } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Quill as BaseQuill } from "~/app/ui/quill"

interface QuillComponentProps {
  name: string
  control: Control<any>
  errors?: FieldErrors
  className?: string
}

export default function QuillComponent({
  name,
  control,
  errors,
  className,
  ...props
}: QuillComponentProps) {
  const { t } = useTranslation()

  const errorMessage =
    errors?.[name] && typeof errors?.[name]?.message === "string"
      ? t(errors[name]?.message as string)
      : undefined

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <BaseQuill
          {...field}
          {...props}
          id={name}
          error={errorMessage}
          className={className}
        />
      )}
    />
  )
}
