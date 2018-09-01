import React from 'react';
import CurrentlyReading from '../CurrentlyReading/CurrentlyReading.js';
import { getAll } from "../../BooksAPI.js";

class Home extends React.Component {
  state = { allBooks: [] };

  componentDidMount() {
    getAll().then(response => {
      this.setState({ allBooks: response });
    });
  }

  render() {
    const { allBooks } = this.state;
    console.log(allBooks);
    return (
      <div className="home">
        <CurrentlyReading allBooks={this.state.allBooks}/>
      </div>
    );
  }
}

export default Home;