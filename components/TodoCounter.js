class TodoCounter {
  //todos should be the array of the initial todos
  // selector is the selector for the counter text elememt during instantiaition.
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._completed = todos.filter((todo) => todo.completed).length;
    this._total = todos.length;
    this._updateText();
  }

  //call this when a checkbox is clicked, and when a completed todo is deleted
  updateCompleted = (increment) => {
    this._completed += increment ? 1 : -1;
  };

  updateTotal = (increment) => {
    // if increment is true, add 1 to this._total. Otherwise, subtract 1. In either case
    // call the method to update the text content.
    this._updateText();
  };

  _updateText() {
    // sets all the text content of the corresponding text element.
    //call this in the constructor, and whenever the counts get updatated.
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}
export default TodoCounter;
