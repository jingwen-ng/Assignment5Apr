import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  todoListTitle = 'My To Do List'
  todos = {
    'task 1': false,
    'task 2': true,
    'task 3': false,
  }
  todosTasks = Object.keys(this.todos)

  onClickTask(task) {
    this.todos[task] = !this.todos[task]
  }

  onClearList() {
    this.todos = {}
    this.todosTasks = []
  }

  onAddTask() {
    const tasks = Object.keys(this.todos)
    this.todos[`task ${tasks.length + 1}`] = false
    this.todosTasks = Object.keys(this.todos)
  }

  checkNumCompleted() {
    let i = 0
    for (const task in this.todos) {
      if (this.todos[task] === true) {
        i += 1
      }
    }
    return i
  }
}
