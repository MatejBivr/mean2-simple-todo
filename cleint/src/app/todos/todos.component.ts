import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service'
import { Todo } from '../todo'
import  "rxjs/Rx";;

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
	todos: Todo[];

  constructor(private todoService:TodoService) { }

  ngOnInit() {
  	this.todos = [];
  	this.todoService.getTodos()
  		.map(res=> res.json())
  		.subscribe((todos: any)=> this.todos = todos)
  }

  addTodo($event,todoText){
  	if($event.which === 1){
  		var result;
  		var newTodo = {
  			text: todoText.value,
  			isCompleted: false
  		};
  		result = this.todoService.saveTodo(newTodo);
  		result.subscribe(x => {
  			this.todos.push(newTodo)
  			todoText.value= '';
  		})
  	}
  }

  setEditState(todo, state){
  	if (state){
  		todo.isEditMode = state;
  	} else {
  		delete todo.isEditMode;
  	}
  }

  updateTodoText($event, todo){
  	if($event.which === 13){
  		todo.text= $event.target.value;
  		let _todo= {
  			_id:todo._id,
  			text: todo.text,
  			isCompleted: todo.isCompleted
  		};

  		this.todoService.updateTodo(_todo)
  		.subscribe(data =>{
  			todo.isCompleted = !todo.isCompleted;
  		}); 
  	}
  }

  updateStatus(todo){
  	var _todo = {
  		_id: todo._id,
  		text: todo.text,
  		isCompleted: !todo.isCompleted
  	};

  	this.todoService.updateTodo(_todo)
  		.subscribe(data =>{
  			this.setEditState(todo, false);
  		});
  }

  deleteTodo(todo){
  	let todos = this.todos;

  
  	this.todoService.deleteTodoServer(todo._id)  		
  		.subscribe((data: any)=> {
  			console.log('deleted');
  		})
  }

}