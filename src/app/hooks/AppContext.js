'use client'
import { createContext, useState, useEffect} from 'react';
import { toDoListApi } from '../utils/apiCalls';

const appContext = {
    toDoList: []
}

export const AppContext = createContext(appContext);

export const AppProvider = ({ children }) => {

    const [toDoList, setToDoList] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    
useEffect( () => {
  try {
    toDoListApi.getToDoList().then((initialList) => {
    setToDoList(initialList);
    })
   } catch (error) {
      setErrorMessage(error);
   }
}, []);

const addItem = title => {
    const body = { userId: 1,
  id: toDoList[toDoList.length - 1].id + 1, title, completed: false};
    try {
        toDoListApi.addItemToDoList(body).then((newItem) => {
        setToDoList((currentToDoList) => [...currentToDoList, newItem]);
    });
    } catch(error) {
        setErrorMessage(error.message)
    }   
}

const removeItem = removeId=> {
    try {
     toDoListApi.removeItemToDoList(removeId).then(() => {
         setToDoList((currentToDoList) => currentToDoList.filter((_item, index) => 
        index !== removeId
      ));
    });
    }catch(error) {
        setErrorMessage(error.message);
    }
};

const makeItemChange = (body, indexClicked) => {
    toDoListApi.editItemToDoList(body).then((editedItem) => {
        setToDoList((currentToDoList) => currentToDoList.map(item => 
          item === toDoList[indexClicked] ? editedItem : item
        ));
      });
}
const editItem = (title, indexClicked) => {
     const body = {...toDoList[indexClicked], title, completed: false }
    try {
      makeItemChange(body, indexClicked);
    } catch (error) {
        setErrorMessage(error.message);
    };
};

  const toggleCompleteItem = (completed, indexClicked) => {
      const body = {...toDoList[indexClicked], completed}
      try { 
          makeItemChange(body, indexClicked);
      } catch (error) {
        setErrorMessage(error.message);
      }
  };

    return (
        <AppContext.Provider value={{toDoList, addItem, removeItem, editItem, toggleCompleteItem, errorMessage}}>
            {children}
        </AppContext.Provider>
    )
};