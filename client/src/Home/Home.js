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
      currentlyReading: [],
      wantToRead: [],
      read: [],
    };
  }

  componentDidMount() {
    getAll().then(response => {
      this.setState({ allBooks: response });
      this.composeBooks(response);
    });
  }

  composeBooks(books) {
    const currentlyReading = [];
    const wantToRead = [];
    const read = [];

    books.map(item => {
      if(item.shelf === 'currentlyReading') {
        currentlyReading.push(item);
      }
      if(item.shelf === 'wantToRead') {
        wantToRead.push(item);
      }
      if(item.shelf === 'read') {
        wantToRead.push(item);
      }
    });
    this.setState({ currentlyReading, read, wantToRead });
  }

  updateShelf = (book, newShelf) => {
    if(book.shelf === newShelf || !newShelf) {
      alert('IM SORRY BUT CANT DO THAT');
      return;
    }
    const newShelfCopy = this.state[newShelf];
    newShelfCopy.push(book);

    const currShelf = book.shelf; // current book shelf
    const currentShelfCopy = this.state[currShelf];

    const pastShelf = currentShelfCopy.filter(item => {
      return item.id !== book.id;
    });

    this.setState({ [newShelf]: newShelfCopy, [currShelf]: pastShelf});
  }

  updateBook = (book, newShelf) => {
    update(book, newShelf).then(() => {
      // console.log('curr: ', book.shelf,' new: ', newShelf);
      this.updateShelf(book, newShelf);
    }).catch((err) => {
      alert('deu ruim', err);
    });
  }

  render() {
    const { currentlyReading, wantToRead, read } = this.state;
    return (
      <div className="home">
        <CurrentlyReading currentlyReading={currentlyReading} updateBook={this.updateBook}/>
        <WannaRead wantToRead={wantToRead} updateBook={this.updateBook}/>
        <Read read={read} updateBook={this.updateBook}/>
      </div>
    );
  }
}

export default Home;