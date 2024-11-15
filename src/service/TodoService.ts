import { firestore } from '../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore'; // Import getDoc
import { ITask } from '../state/TodoStore'; // Assuming ITask is your todo type

// Firestore path for ID tracker
const idTrackerRef = doc(firestore, 'idTracker', 'latestId'); // Adjust the path as needed

// Function to create a new todo
export const createTodo = async (newTask: Omit<ITask, 'id'>): Promise<ITask> => {
  const todoCollectionRef = collection(firestore, 'todos'); // Firestore todos collection

  // Get the current ID from the ID tracker
  const idDoc = await getDoc(idTrackerRef);
  let newId = 1; // Default value if no document exists

  if (idDoc.exists()) {
    newId = idDoc.data()?.latestId + 1; // Increment the last used ID
  }

  // Add the new task with the unique numeric ID
  await addDoc(todoCollectionRef, { ...newTask, id: newId });

  // Update the ID tracker document with the new ID
  await updateDoc(idTrackerRef, { latestId: newId });

  // Return the created task with the numeric ID
  return { id: newId, ...newTask };
};

// Function to get all todos
export const getTodos = async (): Promise<ITask[]> => {
  const todoCollectionRef = collection(firestore, 'todos'); // Firestore todos collection
  const todoSnapshot = await getDocs(todoCollectionRef);
  const todoList: ITask[] = todoSnapshot.docs.map(doc => ({
    id: doc.data().id,
    taskName: doc.data().taskName,
    deadline: doc.data().deadline,
  })) as ITask[];

  return todoList; // Return the list of todos
};

// Function to delete a todo
export const deleteTodo = async (taskId: number): Promise<void> => {
  const todoDocRef = doc(firestore, 'todos', taskId.toString()); // Reference to the todo document
  await deleteDoc(todoDocRef); // Delete the todo document
};

// Function to update a todo
export const updateTodo = async (taskId: number, updatedTask: Partial<ITask>): Promise<void> => {
  const todoDocRef = doc(firestore, 'todos', taskId.toString()); // Reference to the todo document
  await updateDoc(todoDocRef, updatedTask); // Update the todo document with the new data
};
