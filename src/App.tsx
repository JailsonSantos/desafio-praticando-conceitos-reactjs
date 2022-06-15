import './global.css';
import { v4 as uuidv4 } from 'uuid';
import styles from './App.module.css';
import { Header } from './components/Header';
import { ItemList } from './components/ItemList';
import { ClipboardText, PlusCircle } from 'phosphor-react';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface ListTasksProps {
  id: string;
  title: string;
  isComplete: boolean;
}

function App() {
  const [listTasks, setListTasks] = useState<ListTasksProps[]>([]);
  const [task, setTask] = useState<ListTasksProps>({} as ListTasksProps);
  const [totalCount, setTotalCount] = useState(0);
  const isNewTaksEmpty = task.title === undefined;

  function handleSubmitTask(event: FormEvent) {
    event.preventDefault();
    setListTasks([task, ...listTasks]);
    setTask({} as ListTasksProps);
  }

  function handleAddTask(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    const newTask = {
      id: uuidv4(),
      title: event.target.value,
      isComplete: false,
    }
    setTask(newTask);
  }
  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!');
  }

  function deleteTask(id: string) {
    const listTasksWithoutDeletedOne = listTasks.filter(task => {
      return task.id !== id;
    });

    let totalCounty = listTasksWithoutDeletedOne.filter((item) => item.isComplete !== false);
    setTotalCount(totalCounty.length);
    setListTasks(listTasksWithoutDeletedOne);
  }

  function handleIsComplete(id: string) {
    var newArray = listTasks.map((item) => {
      if (item.id === id) {
        const isComplete = !item.isComplete;
        return { ...item, isComplete }
      }
      return item
    });

    setListTasks(newArray);
    let totalCounty = newArray.filter((item) => item.isComplete !== false);
    setTotalCount(totalCounty.length);
  }

  return (
    <div>
      <Header />
      <main className={styles.header}>

        <form className={styles.addTasks} onSubmit={handleSubmitTask}>
          <input
            required
            type="text"
            value={task.title || ''}
            onChange={handleAddTask}
            onInvalid={handleNewTaskInvalid}
            placeholder="Adicione uma nova tarefa"
          />
          <button type="submit" disabled={isNewTaksEmpty}>
            Criar <PlusCircle size={20} />
          </button>
        </form>

        <div className={styles.tasksInfo}>
          <div className={styles.tasksHeader}>
            <div>
              <span className={styles.tasksCreated}>Tarefas criadas</span>
              <span className={styles.bullet}>{listTasks.length}</span>
            </div>
            <div>
              <span className={styles.tasksFinalized}>Tarefas concluídas</span>
              <span className={styles.bullet}>{totalCount} de {listTasks.length}</span>
            </div>
          </div>
          <div className={styles.taskContent}>

            {listTasks.length > 0 ?
              <>
                {listTasks?.map(item => {
                  return (
                    <ItemList
                      key={item.id}
                      content={item}
                      onDeleteTask={deleteTask}
                      onHandleToogle={handleIsComplete}
                    />
                  )
                })}
              </>
              :
              <>
                <ClipboardText size={56} />
                <p><strong>Você ainda não tem tarefas cadastradas</strong></p>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </>
            }
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
