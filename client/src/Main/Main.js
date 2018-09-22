import React from 'react';
import { Route } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Search from '../Search/Search';
import { getAll, update, search } from '../../BooksAPI';
import shelfList from './utils'; // shelfs objects

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...shelfList,
      allBooks: [],
      searchedBooks: [],
      query: '',
      activeLoading: false,
      loadMessage: '',
      display: 'none',
    };
  }

  // mount the main component and props
  async componentDidMount() {
    this.setState({
      activeLoading: true,
      loadMessage: 'Loading the application...',
      display: 'flex',
    });
    try {
      const response = await getAll()
      this.composeBooks(response);
      this.setState({
        activeLoading: false,
        loadMessage: '',
        display: 'none',
      });
    } catch (error) {
      console.log(error);
      this.setState({
        activeLoading: false,
        loadMessage: '',
        display: 'none',
      });
    }
  }

  // calls the api of update to update the book

  updateBook = async (book, newShelf) => {
    const bookCopy = book;
    const currentShelf = book.shelf; // current book shelf

    if (currentShelf !== newShelf) {
      this.setState({
        activeLoading: true,
        loadMessage: `Updating your book to: ${newShelf}`,
        display: 'flex',
      });
      try {
        await update(bookCopy, newShelf);
        this.updateShelf(bookCopy, currentShelf, newShelf);
        this.setState({
          activeLoading: false,
          loadMessage: '',
          display: 'none',
        });
      } catch (error) {
        console.log('error', error);
      }
    } else {
      alert('I am sorry but you are trying to move to the same shelf');
    }
  };

  // updates the book's shelf to the selected one from the input value

  updateShelf = (book, currentShelf, newShelf) => {
    const currentShelfCopy = this.state[currentShelf];
    const newShelfCopy = this.state[newShelf];
    const bookCopy = book;

    if (currentShelf !== newShelf) {
      bookCopy.shelf = newShelf;
      newShelfCopy.books.push(bookCopy);
    }

    currentShelfCopy.books = currentShelfCopy.books.filter(
      item => item.id !== bookCopy.id
    );
    const pastShelf = currentShelfCopy;

    this.setState({ [newShelf]: newShelfCopy, [currentShelf]: pastShelf });
  };

  // function for handling the message from the output
  handleQuery = async (e) => {
    // e.preventDefault();
    const typed = e.target.value;
    this.setState({
      activeLoading: true,
      loadMessage: 'Searching books...',
      display: 'flex',
      query: typed,
    });

    if (typed.length > 0) {
      try {
        const result = await search(typed);
        if (result.hasOwnProperty('error')) {
          this.setState({ searchedBooks: [] });
        } else {
          const mapped = result.map((item) => {
            const { currentlyReading, wantToRead, read } = this.state;
            const cr = currentlyReading.books.map(crItem => crItem.id);
            const wr = wantToRead.books.map(wrItem => wrItem.id);
            const re = read.books.map(reItem => reItem.id);
            if (cr.includes(item.id)) {
              item.shelf = 'currentlyReading';
              return item;
            }
            if (wr.includes(item.id)) {
              item.shelf = 'wantToRead';
              return item;
            }
            if (re.includes(item.id)) {
              item.shelf = 'read';
              return item;
            }
            item.shelf = 'none';
            return item;
          });
          this.setState({ searchedBooks: mapped });
        }
        this.setState({
          activeLoading: false,
          loadMessage: '',
          display: 'none',
        });
      } catch (error) {
        this.setState({
          activeLoading: false,
          loadMessage: '',
          display: 'none',
        });
        console.log(error);
      }
    } else {
      // to stop the loader
      this.setState({
        activeLoading: false,
        loadMessage: '',
        display: 'none',
        query: '',
      });
    }
  };

  // create the object of shelfs for the home page

  composeBooks(books) {
    const {
      currentlyReading, wantToRead, read, none,
    } = this.state;
    books.forEach((item) => {
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
      currentlyReading,
      wantToRead,
      read,
      none,
      allBooks: books,
    });
  }

  render() {
    const {
      currentlyReading,
      wantToRead,
      read,
      none,
      searchedBooks,
      query,
      activeLoading,
      loadMessage,
      display,
    } = this.state;
    return (
      <React.Fragment>
        <LoadingOverlay
          active={activeLoading}
          spinner
          text={loadMessage}
          style={{
            width: '100%',
            minHeight: '100%',
            zIndex: '100',
            position: 'fixed',
            display,
          }}
        />
        <Header />
        <Route
          exact
          path="/"
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
        <Route
          exact
          path="/search"
          render={props => (
            <Search
              {...props}
              books={searchedBooks}
              handleQuery={this.handleQuery}
              updateBook={this.updateBook}
              query={query}
            />
          )}
        />
      </React.Fragment>
    );
  }
}

export default Main;
