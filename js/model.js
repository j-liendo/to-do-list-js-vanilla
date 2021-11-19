export default class Model {
    constructor() {
        this.view = null;
        this.todos = JSON.parse(localStorage.getItem('todos'));
        if (!this.todos || this.todos.length < 1) {
            this.currentId = 0;
            this.todos = [{
                id: `task-${this.currentId++}`,
                title: 'Task 1',
                description: 'Task description',
                completed: false
            }]
        } else {
            this.currentId = this.todos[this.todos.length - 1].id;
        }
    }

    setViews(view) {
        this.view = view;
    }

    save() {
        localStorage.setItem('todos', JSON.stringify(this.todos))
    }

    getTodos() {
        return this.todos.map((todo) => ({...todo }));
    }

    addTodo(title, description) {
        const todo = {
            id: `task-${this.currentId++}`,
            title,
            description,
            completed: false
        }

        this.todos.push(todo);
        this.save();

        return {...todo }
    }

    editTodo(id, values) {
        const index = this.findTodo(id);
        Object.assign(this.todos[index], values);
        this.save();
    }

    toggleCompleted(id) {
        const index = this.findTodo(id);
        const todo = this.todos[index];
        todo.completed = !todo.completed;
        // console.log(this.todos);
        this.save();
    }

    findTodo(id) {
        return this.todos.findIndex((todo) => todo.id === id);
    }

    removeTodo(id) {
        const index = this.findTodo(id);
        this.todos.splice(index, 1);
        this.save();
    }
}