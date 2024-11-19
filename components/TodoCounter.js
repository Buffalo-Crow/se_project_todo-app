class TodoCounter {
  //todos should be the array of the initial todos
  // selector is the selector for the counter text elememt during instantiaition.
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._completedTodos = todos.filter((todo) => todo.completed);
    this._completed = this._completedTodos.length;
    this._total = todos.length;
    this._updateText();
  }

  //call this when a checkbox is clicked, and when a completed todo is deleted
  updateCompleted = (increment) => {
    this._completed += increment ? 1 : -1;
    this._updateText();
  };

  updateTotal = (increment) => {
    this._total += increment ? 1 : -1;
    this._updateText();
  };

  _updateText() {
    // sets all the text content of the corresponding text element.
    //call this in the constructor, and whenever the counts get updatated.
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}
export default TodoCounter;
