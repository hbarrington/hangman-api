import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game.jsx';
var $ = require("jquery");

class GameList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {games: []};
  }

  componentDidMount() {
    this.GameList();
  }

  GameList(){
    return $.getJSON('http://localhost:8080/games/')
      .then((data) => {
        console.log(data)
        this.setState({ games: data });
      });
  }


  render() {

      let games = this.state.games.map((game) => {
       return <li> <Game _id={game._id} number_of_guesses={game.number_of_guesses} created_date={game.created_date}/> </li>
      });

      return (
     <div className="gameBox">
       <h1>Available Games</h1>
       <div className="gameList">
         {games}
       </div>
     </div>
   );

  }
};


ReactDOM.render(<GameList/>, document.getElementById('games'));
