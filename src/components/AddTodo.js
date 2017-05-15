import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  button: {
    margin: 12
  }
};

class AddTodo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todo: '',
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (!this.state.todo.trim()) {
      return
    }
    this.props.onAddTodo(this.state.todo)
    this.setState({
      todo: '',
    })
  }

  handleChange = (e) => {
    this.setState({
      todo: e.target.value,
    })
  }

  render() {
    return (
      <div className='add-todo'>
        <form onSubmit={this.handleSubmit}>
          <TextField
            hintText='Input text'
            value={this.state.todo}
            onChange={this.handleChange}
          />
          <RaisedButton label='送信'
            type='submit'
            style={styles.button}
            primary={true}>
          </RaisedButton>
        </form>
      </div>
    )
  }
}

AddTodo.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
}

export default AddTodo;
