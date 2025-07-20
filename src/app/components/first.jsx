'use client'
import React, {useState} from 'react';


export function ToDoList() {

    const [toDoList, setToDoList] = useState([]);
    const [editState, setEditState] = useState({editing: false})

    const addItem = (event) => {
      event.preventDefault();
      const newItemValue = event.target.addItem.value;
      setToDoList((currentToDoList) => [...currentToDoList, {text: newItemValue, checked: false}]);
    };

    const removeItem = (removeIndex) => {
      setToDoList((currentToDoList) => currentToDoList.filter((_item, index) => 
        index !== removeIndex
      ))
    }

    const handleCheckBoxClick = (indexClicked) => {
      const checkBox =  document.getElementById(`checkbox${indexClicked}`);
       const itemClicked = toDoList[indexClicked];
        setToDoList((currentToDoList) => 
          currentToDoList.map(item =>  
            item === itemClicked ? {...itemClicked, checked: checkBox.checked} : item));
    }

    const handleEditClick = (indexClicked) => {
      if (editState.editing) {
        setEditState({editing: false});
        const  editInput =  document.getElementById(`editItem${indexClicked}`);
        setToDoList((currentToDoList) => currentToDoList.map(item => 
          item === toDoList[indexClicked] ? {text: editInput.value, checked: false} : item
        ))
      }  else {
        setEditState({editing: true, itemIndex: indexClicked})
      }
    } 

    return (<div>
      <form onSubmit={addItem}>
    <input 
      name="addItem"
      type="text"
      placeholder="New Item"
    />
    <button type="submit">Add New</button>
    </form>

    
    {toDoList.length > 0 ? toDoList.map((item, i)=> {
     return (
      <div key={`item${i}`}>
        {!editState.editing ? 
        (
          <div>
 <input type="checkbox" name="isComplete" id={`checkbox${i}`} onClick={() => handleCheckBoxClick(i)}/>
        <label htmlFor={`checkbox${i}`}>
          {item.checked ? 
          <s>{item.text}</s>
           : <span>{item.text}</span>
        }
          </label>
        
        </div>
        ) :
         (
          <div>
        
              <input 
                id={`editItem${i}`}
                name="editItem"
                type="text"
                placeholder={item.text}
              />
            
            </div>
         )
      
      }
       <button onClick={() => handleEditClick(i)}>{editState.editing ? 'Save' : 'Edit' }</button>
        <button onClick={() => removeItem(i)}>Remove</button>
      </div>
     )
     
    }) :
    <p>No items yet!</p>}
    </div>);

}