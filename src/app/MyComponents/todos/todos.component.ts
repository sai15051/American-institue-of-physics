import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'src/app/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {
  // @Input() todo: Todo = new Todo;
  // @Output() todoDelete:EventEmitter<Todo>= new EventEmitter();
  todos: Todo[];
  constructor(){
    this.todos = [] 
  }
  ngOnInit(): void {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos); 
    }
  }
  // deleteTodo(todo: Todo) {
  //   const ind =this.todos.indexOf(todo);
  //   this.todos.splice(ind,1);
  //   localStorage.setItem("todos",JSON.stringify(this.todos))
  // }
  addTodo(todo:Todo){
    this.todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
  onClick(todo:Todo){
    // this.todoDelete.emit(todo)
    const ind =this.todos.indexOf(todo);
    this.todos.splice(ind,1);
    localStorage.setItem("todos",JSON.stringify(this.todos))
  }

}
