import React from 'react';
import CurrentlyReading from '../CurrentlyReading/CurrentlyReading.js';
import WannaRead from '../WannaRead/WannaRead.js';
import Read from '../Read/Read.js';
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
        {/* <span className="home__separator"><div className="home__separator-element"/></span> */}
        <WannaRead allBooks={this.state.allBooks}/>
        {/* <span className="home__separator"><div className="home__separator-element"/></span> */}
        <Read allBooks={this.state.allBooks}/>
      </div>
    );
  }
}

export default Home;