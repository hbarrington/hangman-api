import React from 'react';

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <h4 className="game-id">
          {"Game ID: " + this.props._id}
        </h4>
        <h4 className="number-of-guesses">
          {"Number of Guesses " + this.props.number_of_guesses}
        </h4>
        <h4 className="date-created">
          {"Created: " + this.props.created_date}
        </h4>
      </div>
    );
  }
};

export default Game;

// import ReactDOM from 'react-dom';
// ReactDOM.render(<Game _id='123456789' number_of_guesses='6' created_date='1-2-16'/>, document.getElementById('games'));
