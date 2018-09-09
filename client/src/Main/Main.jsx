import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header/Header';
import Home from '../Home/Home.jsx';
import Search from '../Search/Search';
import { getAll, update } from '../../BooksAPI';
import shelfList from './utils'; // shelfs objects

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...shelfList,
    };
  }

  componentDidMount() {
    getAll().then(response => this.composeBooks(response));
  }

  updateBook = (book, newShelf) => {
    const bookCopy = book;
    const currentShelf = book.shelf; // current book shelf

    if (currentShelf !== newShelf) {
      update(bookCopy, newShelf)
        .then(() => {
          this.updateShelf(bookCopy, currentShelf, newShelf);
        })
        .catch((error) => {
          console.log('error', error);
        });
    } else {
      console.log('same shelf');
    }
  };

  updateShelf = (book, currentShelf, newShelf) => {
    const currentShelfCopy = this.state[currentShelf];
    const newShelfCopy = this.state[newShelf];
    const bookCopy = book;

    if (currentShelf !== newShelf) {
      bookCopy.shelf = newShelf;
      newShelfCopy.books.push(bookCopy);
    }

    currentShelfCopy.books = currentShelfCopy.books.filter(item => item.id !== bookCopy.id);
    const pastShelf = currentShelfCopy;

    this.setState({ [newShelf]: newShelfCopy, [currentShelf]: pastShelf });
  };

  composeBooks(books) {
    const {
      currentlyReading, wantToRead, read, none,
    } = this.state;

    books.map((item) => {
      if (item.shelf === 'currentlyReading') {
        currentlyReading.books.push(item);
      }
      if (item.shelf === 'wantToRead') {
        wantToRead.books.push(item);
      }
      if (item.shelf === 'read') {
        read.books.push(item);
      } else {
        none.books.push(item);
      }
    });
    this.setState({
      currentlyReading, wantToRead, read, none,
    });
  }

  render() {
    const {
      currentlyReading, wantToRead, read, none,
    } = this.state;
    return (
      <div>
        <Header />
        <Route
          exact
          path='/'
          render={props => (
            <Home
              {...props}
              currentlyReading={currentlyReading}
              wantToRead={wantToRead}
              read={read}
              none={none}
              updateBook={this.updateBook}
            />
          )}
        />
        {/* <Route exact path="/search" component={Search} /> */}
      </div>
    );
  }
}

export default Main;
