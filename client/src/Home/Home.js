import React from 'react';
import CurrentlyReading from '../CurrentlyReading/CurrentlyReading.js';
import WannaRead from '../WannaRead/WannaRead.js';
import Read from '../Read/Read.js';
import { getAll, update } from "../../BooksAPI.js";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allBooks: [],
    };
  }

  componentDidMount() {
    getAll().then(response => {
      this.setState({ allBooks: response });
    });
  }

  updateBook = (book, shelf) => {
    update(book, shelf).then(response => {
      const { allBooks } = this.state;
      const bookIndex = allBooks.findIndex(() => { book.id === response; });
      console.log(bookIndex);
    });
  }

  render() {
    const { allBooks } = this.state;
    console.log(allBooks);
    return (
      <div className="home">
        <CurrentlyReading allBooks={this.state.allBooks} updateBook={this.updateBook}/>
        <WannaRead allBooks={this.state.allBooks} updateBook={this.updateBook}/>
        <Read allBooks={this.state.allBooks} updateBook={this.updateBook}/>
      </div>
    );
  }
}

export default Home;