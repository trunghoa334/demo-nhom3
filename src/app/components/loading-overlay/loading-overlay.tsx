import { LoadingOverlay as BaseLoadingOverlay } from "~/app/ui/loadingoverlay/loading-overlay"

interface LoadingOverlayComponentProps {
  show: boolean
  closing?: boolean
  text?: string
}

export default function LoadingOverlayComponent({
  show,
  closing = false,
  text = "Loading...",
}: LoadingOverlayComponentProps) {
  return <BaseLoadingOverlay isLoading={show} isClosing={closing} loadingText={text} />
}
