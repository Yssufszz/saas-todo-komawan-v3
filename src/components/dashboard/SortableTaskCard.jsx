import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import TaskCard from './TaskCard'

const SortableTaskCard = ({ task, onEdit }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 'auto',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`touch-none transition-all duration-200 ${
        isDragging ? 'cursor-grabbing scale-105' : 'cursor-grab hover:scale-[1.02]'
      }`}
    >
      <TaskCard task={task} onEdit={onEdit} isDragging={isDragging} />
    </div>
  )
}

export default SortableTaskCard