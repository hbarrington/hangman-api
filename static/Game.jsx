import React from 'react';
var $ = require("jquery");

class GuessForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {guess: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({guess: event.target.value.charAt(0)});
  }

  handleSubmit(event) {
    const it = this;
    $.ajax({
      url: 'http://localhost:8080/games/'+it.props._id,
      method: 'PUT',
      data: it.state,
      dataType: 'json'
    }).done( function(response) {
      it.props.onSuccess(response);
    });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Guess:
          <input type="text" name='guess' value={this.state.guess} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class Game extends React.Component {

  render() {
    return (
      <div className="game">
        <h4 className="game-header">
          {"Game " + this.props._id + " created on " + this.props.created_date}
        </h4>
        <h4 className="number-of-guesses">
          {"Number of Guesses " + this.props.number_of_guesses}
        </h4>
        <h4 className="partial-word">
          {this.props.partial_word}
        </h4>
        <h4 className="wrong-guesses">
          {this.props.wrong_guesses}
        </h4>
        <h4 className="guess">
          <GuessForm _id={this.props._id} onSuccess={(updated_game) => this.props.onSuccess(updated_game)}/>
        </h4>
      </div>
    );
  }
};

export default Game;
