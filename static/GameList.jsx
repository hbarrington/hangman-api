import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game.jsx';
var $ = require("jquery");

function GameListing(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props._id} - {props.number_of_guesses} guesses - {props.created_date}
    </button>
  );
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
    return $.getJSON('http://localhost:8080/games/')
      .then((data) => {
        this.setState({ games: data });
      });
  }

  getGame(id){
    return $.getJSON('http://localhost:8080/games/'+id)
      .then((data) => {
        let game = <Game
          _id={data._id}
          number_of_guesses={data.number_of_guesses}
          created_date={data.created_date}
          partial_word={data.partial_word}
          wrong_guesses={data.wrong_guesses}
          />
        this.setState({ current_game: game})
      });
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
       <div className="currentGame">
         {this.state.current_game}
       </div>
     </div>
    );
  }

};


ReactDOM.render(<GameList/>, document.getElementById('games'));
