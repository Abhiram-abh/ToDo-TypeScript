// src/services/todoService.ts
import { firestore } from '../src/firebaseConfig'; // Correct import of db
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ITask } from '../src/state/TodoStore'; // Assuming ITask is your todo type

const todoCollectionRef = collection(firestore, 'todos'); // Replace 'todos' with your Firestore collection name

export const createTodo = async (newTask: Omit<ITask, 'id'>) => {
  await addDoc(todoCollectionRef, newTask);
};

// src/Firebase.ts (or wherever you are fetching todos)
export const getTodos = async (): Promise<ITask[]> => {
  const querySnapshot = await getDocs(todoCollectionRef);
  return querySnapshot.docs.map(doc => {
    const data = doc.data() as { taskName: string; deadline: number }; // Define expected structure
    return {
      id: Number(doc.id), // Convert id to number
      taskName: data.taskName,
      deadline: data.deadline,
    } as ITask; // Ensure to match the ITask structure
  });
};


export const deleteTodo = async (taskId: string) => {
  const todoDoc = doc(firestore, 'todos', taskId);
  await deleteDoc(todoDoc);
};
