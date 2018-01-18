import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: '',
      newItem: '',
      toDos: [ 
      ]
    }
  }
  clear = () => {
    this.setState({ toDos: [] });
  }
  deleteItem = (item) => {
    console.log("Parent delete function");
    let toDosLocal = this.state.toDos;
    let itemIndex = toDosLocal.indexOf(item);
    if(itemIndex >= 0) {
      toDosLocal.splice(itemIndex, 1);
      this.setState({ toDos: toDosLocal });
    }
  }
  add = (event) => {
    event.preventDefault();
    if(this.state.newItem){
      let toDosLocal = this.state.toDos;
      toDosLocal.push(this.state.newItem);
      //newitem is a non-empty string
      this.setState({
        error: '',
        newItem: '',
        toDos: toDosLocal
      })
    } else {
      this.setState({ error: 'Please type something in the box' })
    }
  }
  newItemChange = (event) => {
    this.setState({ newItem: event.target.value, error: '' });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="header-title">To-Do</h1>
        </header>
        <div className="container">
          {/* To do list - in STATES so we can CHANGE it as we update! */}
          <ToDoList items={this.state.toDos} onDelete={this.deleteItem} />
          {/* Error handling */}
          <p className="error">{this.state.error}</p>
          {/* Form to add new item */}
          <form onSubmit={this.add}>
            <input type="text" className="form-control" placeholder="I need to..." onChange={this.newItemChange} value={this.state.newItem} />
          </form>
          <button type="submit" className="btn btn-warning" onClick={this.add}>Add</button>
          <button className="btn btn-default" onClick={this.clear}>Clear List</button>
          {/* Button to clear list */}
        </div>
      </div>
    );
  }
}

class ToDoList extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const toDoItems = this.props.items.map( thing => {
      return <ListItem item={thing} onDelete={this.props.onDelete} />
    });
    return (
      <div>
        <ul>
          {toDoItems}
        </ul>
      </div>
    );
  }
}

class ListItem extends Component {
  constructor(props){
    super(props);
  }
  deleteHandler = () => {
    console.log('delete handler');
    console.log(this.props.item);
    this.props.onDelete(this.props.item);
  }
  render(){
    return (
      <div>
        <li>
          {this.props.item}
          <button type="button" className="btn btn-default btn-s pull-left" onClick={this.deleteHandler}><span className="glyphicon glyphicon-ok" aria-hidden="true"></span></button>
        </li>
      </div>
    );
  }
}

export default App;
