import { Scrollbar as BaseScrollbar } from "~/app/ui/scrollbar/scrollbar"

interface ScrollbarComponentProps {
  children: React.ReactNode
  height?: string | number
}

export default function ScrollbarComponent({ children, height }: ScrollbarComponentProps) {
  return <BaseScrollbar height={height}>{children}</BaseScrollbar>
}
