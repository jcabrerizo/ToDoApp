import {ToDoList} from './components/ToDoList';
import {AppProvider} from './hooks/AppContext';


export default function Home() {
  return (
    <AppProvider>
      <ToDoList />
    </AppProvider>
    
  );
}
