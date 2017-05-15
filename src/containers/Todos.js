import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'

import * as TodoActions from '../actions/todos'


class Todos extends Component {

  componentDidMount(){
    const {actions} = this.props;
    actions.loadTodos()
  }

  render() {
    const { todos, actions } = this.props;
    return (
      <div>
        <div>React + Redux Sample</div>
        <AddTodo onAddTodo={actions.addTodo}  />
        <TodoList
          todos={todos}
          onDeleteClick={actions.deleteTodo}
          onTodoClick={actions.updateTodo} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos ? state.todos : []
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);
