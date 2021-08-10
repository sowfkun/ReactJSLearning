import { Component } from 'react';
import './App.css';
import TodoItem from './components/todo-item/TodoItem';
import TrafficLight from './components/traffic-light/TrafficLight';

class App extends Component {
  constructor() {
    super(); // inherit from Component
    this.todoItems = [
      { content: 'Shopping', isComplete: true },
      { content: 'Play soccer' },
      { content: 'Swimming' }
    ];
  }

  render() {
    return (
      <div className="App" >
        {/* Change from array of string to array of component */}
        {
          // Add props key to identify item in list
          this.todoItems.length > 0 && this.todoItems.map((item, index) =>
            <TodoItem key={index} item={item} />
          )
        }
        {
          this.todoItems.length === 0 && 'Nothing to do'
        }

        {/** State exercise */}
        <TrafficLight />
      </div>
    );
  }
}

export default App;
