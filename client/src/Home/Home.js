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

  updateCurrentShelf = (book) => {
    const shelf = book.shelf;
    const currentShelfCopy = this.state[shelf];
    console.log(book);
    // const idx = currentShelfCopy.indexOf(book);
    // console.log(idx, 'idxxxx');
    // if (idx > -1) {
    //   return currentShelfCopy.splice(idx, 1);
    // }
    const newarr = currentShelfCopy.filter(item => {
      return item === book.id;
    });
    console.log(currentShelfCopy, newarr);
    this.setState({ currentShelfCopy });
  };

  updateNewShelf = (book, newShelf) => {
    const newShelfCopy = this.state[newShelf];
    newShelfCopy.push(book);
    this.setState({newShelfCopy});
  }

  updateBook = (book, newShelf) => {
    update(book, newShelf).then(response => {
      // this.updateNewShelf(book, newShelf);
      // this.updateCurrentShelf(book);
      console.log(response);
    }).then(() => {
      this.updateCurrentShelf(book);
    }).then(() => {
      this.updateNewShelf(book, newShelf);
    }).catch((err) => {
      alert('deu ruim', err);
    });
  }

  render() {
    const { allBooks, currentlyReading, wantToRead, read } = this.state;
    // console.log(allBooks);
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