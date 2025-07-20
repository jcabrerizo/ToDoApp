import { toDoListApiUrls } from "../constants/api";

const getToDoList =() => {
    return fetch(toDoListApiUrls.GET, {method: 'GET'}).then((response) => {
       if (response.status === 200){
        return response.json();
       } else {
        throw new Error('There was a problem fetching this list ')
       };
    });
};

const addItemToDoList = (newItem) => {

 return fetch(toDoListApiUrls.POST, {method: 'POST', headers:
{'Content-type': 'application/json; charset=UTF-8'}, body: JSON.stringify(newItem)}).then((response) => {
       if (response.status === 201){
        return response.json();
       }
       else {
        throw new Error('There was a problem adding this item')
       };
    });
};

const editItemToDoList = (editedItem) => {
 return fetch(toDoListApiUrls.PUT(editedItem.id), {method: 'PUT', headers:
{'Content-type': 'application/json; charset=UTF-8'}, body: JSON.stringify(editedItem) }).then((response) => {
       if (response.status === 200){
        return response.json();
       } else {
        throw new Error('There was a problem  editing this item ')
       };
    });
};

const removeItemToDoList = (id) => {
 return fetch(toDoListApiUrls.DELETE(id), {method: 'DELETE'}).then((response) => {
       if (response.status === 200){
        return;
       } else {
        throw new Error('There was a problem removing this item ')
       };
    });
}

export const toDoListApi = {getToDoList, addItemToDoList, editItemToDoList, removeItemToDoList};