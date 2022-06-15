import { CheckCircle, Circle, Trash } from 'phosphor-react';
import styles from './ItemList.module.css';

interface TaskProps {
  id: string;
  title: string;
  isComplete: boolean;
}

interface ItemListProps {
  content: TaskProps;
  onDeleteTask: (task: string) => void;
  onHandleToogle: (id: string) => void;
}

export function ItemList({ content, onDeleteTask, onHandleToogle }: ItemListProps) {

  const { isComplete } = content

  function handleToogle() {
    onHandleToogle(content.id);
  }

  function handleDeleteTask() {
    onDeleteTask(content.id);
  }

  return (
    <div className={isComplete ? styles.containerComplet : styles.container}>
      <button onClick={handleToogle} className={styles.isComplete}>
        {content.isComplete ? <CheckCircle size={24} /> : <Circle size={24} color="#4EA8DE" />
        }
      </button>
      <div className={isComplete ? styles.contentComplet : styles.content}>
        {content.title}
      </div>
      <button onClick={handleDeleteTask} className={styles.trash}>
        <Trash size={24} />
      </button>
    </div>
  )
}