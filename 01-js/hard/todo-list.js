/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor(){
    this.list=[];
  }

 add(todo){
  this.list.push(todo);
}

 remove(indexOfTodo){
 this.list.splice(indexOfTodo,1);
}

update(index, updatedTodo) {
  if (index < 0 || index >= this.list.length) {
    return this.list.concat('Invalid Task');
  }
  this.list[index] = updatedTodo;
  return this.list;
}

getAll(){
  return this.list;
}

get(indexOfTodo) {
  console.log(indexOfTodo);
  if (indexOfTodo < 0 || indexOfTodo >= this.list.length) {
    console.log('hi');
    return null;
  }
  return this.list[indexOfTodo];
}

clear(){
this.list =[];
}
}

module.exports = Todo;
