import todoStore from '../store/todo.store';
import html from './app.html?raw';
import {renderTodos} from './use-cases';



const ElementIds = {

    ClearCompletedButton : '.clear-completed',
    TodoList : '.todo-list',
    NewTodoInput : '#new-todo-input',
}
/**
 * @param {string} elementId
 */

export const App = (elementId) =>{

    const displayTodos = () =>{
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos(ElementIds.TodoList, todos);

    }
    //Cuando la funcion app() se llama
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    //Referencias HTML
    const  newDescriptionInput = document.querySelector(ElementIds.NewTodoInput);
    const todoListUL = document.querySelector(ElementIds.TodoList);
    const ClearCompletedButton = document.querySelector(ElementIds.ClearCompletedButton);


    //Listeners
    newDescriptionInput.addEventListener('Keyup', (event)=>{
        
        if(event.keyCode !== 13) return;
        if(event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if(!element || !isDestroyElement) return;
        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    ClearCompletedButton.addEventListener('click', () =>{
        todoStore.deleteCompleted();
        displayTodos();
    })


}