'use client'
import React, {useState, useContext} from 'react';
import { AppContext} from '../hooks/AppContext.js';

export const ToDoList = () => {

    const appContext = useContext(AppContext);

    const {toDoList, errorMessage, addItem, removeItem, editItem, toggleCompleteItem } = appContext;

    const [editState, setEditState] = useState({editing: false})

    const handleAddItem = (event) => {
      event.preventDefault();
      const newItemValue = event.target.addItem.value;
      addItem(newItemValue);
    };

    const handleCheckBoxClick = (indexClicked) => {
      const checkBox =  document.getElementById(`checkbox${indexClicked}`);
      toggleCompleteItem(checkBox.checked, indexClicked);
    };

    const handleEditClick = (itemIndex) => {
      if (editState.editing) {
        setEditState({editing: false});
        const  editInput =  document.getElementById(`editItem${itemIndex}`);
        editItem(editInput.value, indexClicked);
      }  else {
        setEditState({editing: true, indexClicked})
      }
    } 

    return (
    <div>
      <form onSubmit={handleAddItem}>
    <input 
      name="addItem"
      type="text"
      placeholder="New Item"
    />
    <button type="submit">Add New</button>
    </form>

    <p>{errorMessage}</p>

    {toDoList?.length > 0 ? toDoList.map((item, i)=> {
     return (
      <div key={`item${i}`}>
        {editState.editing && i === editState.itemIndex ? 
        (
           <div>
              <input 
                id={`editItem${i}`}
                name="editItem"
                type="text"
                placeholder={item.title}
              />
            
            </div> 
        ) :
         (
         <div>
 <input type="checkbox" name="isComplete" id={`checkbox${i}`} checked={item.completed} onChange={() => handleCheckBoxClick(i)}/>
        <label htmlFor={`checkbox${i}`}>
          {item.completed ? 
          <s>{item.title}</s>
           : <span>{item.title}</span>
        }
          </label> 
        </div>
         )
      }
       <button disabled={editState.editing && i !== editState.itemIndex} onClick={() => handleEditClick(i)}>{editState.editing && i=== editState.itemIndex ? 'Save' : 'Edit' }</button>
        <button disabled={editState.editing && i !== editState.indexIndexß}  onClick={() => removeItem(i)}>Remove</button>
      </div>
     )}) : <p>No items yet!</p>}
    </div>
    ) ;
}