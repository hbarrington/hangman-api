import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game.jsx';
var $ = require("jquery");
const host = location.origin

function GameListing(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props._id} - {props.number_of_guesses} guesses - {props.created_date}
    </button>
  );
}

class GameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {word: '', number_of_guesses: 6};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const field = event.target.name;
    this.setState({[field]: event.target.value});
  }

  handleSubmit(event) {
    const it = this;
    $.post(host+'/games/', this.state, function(response) {
      it.props.onSuccess(response);
    }, 'json');
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Word:
          <input type="text" name='word' value={this.state.word} onChange={this.handleChange} />
        </label>
        <label>
          Number of Guesses:
          <input type="text" name='number_of_guesses' value={this.state.number_of_guesses} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


class GameList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {games: [], current_game: null};
  }

  componentDidMount() {
    this.getGames();
  }

  getGames(){
    return $.getJSON(host+'/games/')
      .then((data) => {
        this.setState({ games: data });
      });
  }

  getGame(id){
    return $.getJSON(host+'/games/'+id)
      .then((data) => {
        this.updateCurrentGame(data);
      });
  }

  updateCurrentGame(data){
    let game = <Game
      _id={data._id}
      status={data.status}
      number_of_guesses={data.number_of_guesses}
      created_date={data.created_date}
      partial_word={data.partial_word}
      wrong_guesses={data.wrong_guesses}
      guesses_left={data.number_of_guesses - data.wrong_guesses.length}
      onSuccess={(updated_game) => this.updateCurrentGame(updated_game)}
      />
    this.setState({current_game: game});
  }

  updateGamesList(new_game){
    let games = this.state.games.slice();
    games.push(new_game);
    this.setState({ games: games })
  }

  render() {
    let games = this.state.games.map((game) => {
     return <li key={game._id}> <GameListing _id={game._id} number_of_guesses={game.number_of_guesses} created_date={game.created_date} onClick={() => this.getGame(game._id)}/> </li>
    });

    return (
     <div className="gameListBox">
       <h1>Available Games</h1>
       <div className="gameList">
         {games}
       </div>
       <div className="createGame">
         <h3>Create a new game</h3>
         <GameForm onSuccess={(new_game) => this.updateGamesList(new_game)} />
       </div>
       <div className="currentGame">
         {this.state.current_game}
       </div>
     </div>
    );
  }

};


ReactDOM.render(<GameList/>, document.getElementById('games'));
