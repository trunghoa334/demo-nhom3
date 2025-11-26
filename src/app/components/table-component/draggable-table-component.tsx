/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    MouseSensor,
    pointerWithin,
    TouchSensor,
    UniqueIdentifier,
    useSensor,
    useSensors
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import DraggableRow from '~/app/components/table-component/_components/draggable-row'
import Table, { TableProps } from './table-component'

interface DraggableTableProps<TData, TValue> extends Omit<TableProps<TData, TValue>, 'renderRow'> {
    keyDnd: string
    dataIdsDnd?: UniqueIdentifier[]
    onChangeDragEnd?: (event: DragEndEvent) => void
    draggingMode?: boolean
}

export default function DraggableTable<TData, TValue>({
    keyDnd,
    dataIdsDnd,
    onChangeDragEnd,
    draggingMode = false,
    compactChild,
    ...tableProps
}: Readonly<DraggableTableProps<TData, TValue>>) {
    // Better sensors config for handling nested components
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 5 // Only start dragging after moving 5px
        }
    })

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 250, // Wait this many ms before activating
            tolerance: 5 // Allow slight movement
        }
    })

    const keyboardSensor = useSensor(KeyboardSensor, {})

    // Improved sensors configuration
    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor)

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={pointerWithin}
            onDragEnd={onChangeDragEnd}
            modifiers={[restrictToVerticalAxis]}
            {...(draggingMode
                ? {
                      autoScroll: {
                          threshold: { x: 0.2, y: 0.2 },
                          acceleration: 10,
                          interval: 5
                      }
                  }
                : {})}
        >
            <Table
                {...tableProps}
                renderRow={(row) => (
                    <SortableContext key={row.id} items={dataIdsDnd ?? []} strategy={verticalListSortingStrategy}>
                        <DraggableRow row={row} dndKey={keyDnd} draggingMode={draggingMode} compactChild={compactChild} />
                    </SortableContext>
                )}
            />
        </DndContext>
    )
}
