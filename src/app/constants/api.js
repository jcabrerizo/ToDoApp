export const toDoListApiUrls = {
    GET: 'https://jsonplaceholder.typicode.com/users/4/todos',
    POST: 'https://jsonplaceholder.typicode.com/todos/',
    PUT: (id) => `https://jsonplaceholder.typicode.com/todos/${id}`,
    DELETE: (id) => `https://jsonplaceholder.typicode.com/todos/${id}`
}