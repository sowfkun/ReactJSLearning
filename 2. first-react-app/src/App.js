import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// Import Component
import './App.css';
import TodoItem from './components/todo-item/TodoItem';
import TrafficLight from './components/traffic-light/TrafficLight';
import Accordion from './components/accordion/Accordion';
import Ref from './components/ref/Ref';
import Counter from './components/life-cycle/Counter';
import Bootstrap from './components/bootstrap/Bootstrap';
import Card from './components/functional-statless-component/Card';
import HoverOpacity from './components/higher-order-component/HoverOpacity';
import AwesomeImg from './components/higher-order-component/AwesomeImg';
import withHoverOpacity from './components/higher-order-component/withHoverOpacity';
import RenderProps from './components/render-props/RenderProps';
import RenderPropsCounter from './components/render-props/RenderPropsCounter';
// provider consumer
import { NumberProvider } from './components/context-api and useContext/NumberContext';
import CounterFuncSetState from './components/functional-setstate/CounterFuncSetState';
import CounterUseState from './components/hook-useState/CounterUseState';
import RandomNumber from './components/context-api and useContext/RandomNumber';

// Component AwesomeImg is wrapped by other component use withHoverOpacity component
// second param is opacity wanted
const HigherOrderComponent = withHoverOpacity(AwesomeImg, 0.8);

const Home = () => {
  return <h2>Home</h2>;
};

const About = () => {
  return <h2>About</h2>;
};

const data = ['A', 'B', 'C'];

class App extends Component {
  constructor() {
    super(); // inherit from Component

    // state exercise (traffic light)
    this.state = {
      todoItems: [
        { content: 'Shopping', isComplete: true },
        { content: 'Play soccer', isComplete: false },
        { content: 'Swimming', isComplete: false },
      ],
      showCounter: true,
    };
  }

  onItemClick(item, index) {
    return (event) => {
      const isComplete = item.isComplete;
      const { todoItems } = this.state;

      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete,
          },
          ...todoItems.slice(index + 1),
        ],
      });
    };
  }

  removeCounter() {
    this.setState({ showCounter: false });
  }

  render() {
    const { todoItems } = this.state;
    return (
      <Router>
        <NumberProvider>
          <div className='App'>
            <div className='Exercise'>
              <div className='header'>
                <input
                  className='Add-new'
                  placeholder='Input new task'
                  type='text'
                ></input>
              </div>

              {/* Change from array of string to array of component */}
              <div className='List-items'>
                <div className='Check-all-zone'>
                  <input type='checkbox' className='Check-all'></input>
                  <p>Check all</p>
                </div>

                {
                  // todo list exercise
                  // Add props key to identify item in list
                  todoItems.length > 0 &&
                    todoItems.map((item, index) => (
                      <TodoItem
                        key={index}
                        item={item}
                        onClick={this.onItemClick(item, index)}
                      />
                    ))
                }
                {todoItems.length === 0 && 'Nothing to do'}
              </div>
            </div>

            {/** State exercise */}
            <div className='Exercise'>
              <h2>State exercise</h2>
              <TrafficLight />
            </div>

            {/** Props child exercise */}
            <div className='Exercise'>
              <h2>Props child exercise</h2>
              <Accordion heading='heading' content='content use props'>
                content use prop children
              </Accordion>
            </div>

            {/** React Ref exercise */}
            <div className='Exercise'>
              <h2>React Ref exercise</h2>
              <Ref />
            </div>

            {/** life cycle exercise */}
            <div className='Exercise'>
              <h2>Life cycle exercise </h2>
              {this.state.showCounter && <Counter />}
              <button
                className='btn btn-danger'
                onClick={() => this.removeCounter()}
              >
                Remove counter
              </button>
              {/** Remove counter to check component Will unmount */}
            </div>

            {/** bootstrap exercise */}
            <div className='Exercise'>
              <h2>BootStrap exercise</h2>
              <Bootstrap buttonLabel='Modal' className='ModalTest' />
            </div>

            {/** Functional Stateless Component exercise */}
            <div className='Exercise'>
              <h2>Functional Stateless Component exercise</h2>
              <Card imgUrl='https://picsum.photos/200/300'>
                <p>don't have state </p>
                <p>props are argument of function</p>
                <p>don't have life cycle</p>
              </Card>
            </div>

            {/** Router exercise */}
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/about'>About</Link>
              </li>
            </ul>
            <Route path='/' exact component={Home} />
            <Route path='/about' exact component={About} />

            {/** Higher order components exercise */}
            <div className='Exercise'>
              <h2>Higher order Component exercise</h2>
              <h4>Normal</h4>
              <HoverOpacity>
                <AwesomeImg src='https://picsum.photos/seed/picsum/200/300' />
              </HoverOpacity>
              <h4>use higher order component</h4>
              <HigherOrderComponent src='https://picsum.photos/seed/picsum/200/300' />
            </div>

            {/** render props exercise */}
            <div className='Exercise'>
              <h2>render props exercise</h2>
              <RenderProps data={data} render={(item) => <div>{item}</div>} />
              <RenderProps data={data} render={(item) => <div>- {item}</div>} />
              <RenderProps data={data} render={(item) => <div>+ {item}</div>} />

              <h2>Counter example</h2>
              <RenderPropsCounter render={(value) => <div>{value.count}</div>}>
                {({ count }) => <div>{count}</div>}
              </RenderPropsCounter>
            </div>

            {/** context api exercise */}
            <div className='Exercise'>
              <h2>context api exercise</h2>
              <RandomNumber />
            </div>

            {/** Functional setState exercise */}
            <div className='Exercise'>
              <h2>Functional setState exercise</h2>
              <CounterFuncSetState />
            </div>

            {/** Functional setState exercise */}
            <div className='Exercise'>
              <h2>useState exercise</h2>
              <CounterUseState />
            </div>
          </div>
        </NumberProvider>
      </Router>
    );
  }
}

export default App;
