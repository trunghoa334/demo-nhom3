import { Skeleton as BaseSkeleton } from "~/app/ui/skeleton/skeleton"

interface SkeletonComponentProps {
  width?: string | number
  height?: string | number
  rounded?: boolean
}

export default function SkeletonComponent({ width = "100%", height = "1em", rounded }: SkeletonComponentProps) {
  return (
    <BaseSkeleton
      style={{ width, height }}
      rounded={rounded}
    />
  )
}
