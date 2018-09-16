import React from "react";
import { Route } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import Header from "../Header/Header.jsx";
import Home from "../Home/Home.jsx";
import Search from "../Search/Search.jsx";
import { getAll, update, search } from "../../BooksAPI";
import shelfList from "./utils"; // shelfs objects

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...shelfList,
      books: [],
      query: "",
      activeLoading: false,
      loadMessage: "",
      display: 'none',
    };
  }

  componentDidMount() {
    this.setState({
      activeLoading: true,
      loadMessage: "Loading the application...",
      display: 'flex'
    });
    getAll()
      .then(response => this.composeBooks(response))
      .then(() => {
        this.setState({ activeLoading: false, loadMessage: "", display: 'none' });
      })
      .catch(error => {
        console.log(error);
        this.setState({ activeLoading: false, loadMessage: "", display: 'none' });
      });
  }

  updateBook = (book, newShelf) => {
    const bookCopy = book;
    const currentShelf = book.shelf; // current book shelf

    if (currentShelf !== newShelf) {
      this.setState({
        activeLoading: true,
        loadMessage: `Updating your book to: ${newShelf}`,
        display: 'flex'
      });
      update(bookCopy, newShelf)
        .then(() => {
          this.updateShelf(bookCopy, currentShelf, newShelf);
          this.setState({
            activeLoading: true,
            loadMessage: `Success on updating book to ${newShelf}`,
            display: 'flex'
          });
        })
        .then(() => {
          this.setState({
            activeLoading: false,
            loadMessage: '',
            display: 'none'
          });
        })
        .catch(error => {
          console.log("error", error);
        });
    } else {
      alert("I am sorry but you are trying to move to the same shelf");
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

    currentShelfCopy.books = currentShelfCopy.books.filter(
      item => item.id !== bookCopy.id
    );
    const pastShelf = currentShelfCopy;

    this.setState({ [newShelf]: newShelfCopy, [currentShelf]: pastShelf });
  };

  composeBooks(books) {
    const { currentlyReading, wantToRead, read, none } = this.state;

    books.map(item => {
      if (item.shelf === "currentlyReading") {
        currentlyReading.books.push(item);
      }
      if (item.shelf === "wantToRead") {
        wantToRead.books.push(item);
      }
      if (item.shelf === "read") {
        read.books.push(item);
      } else {
        none.books.push(item);
      }
    });

    this.setState({
      currentlyReading,
      wantToRead,
      read,
      none
    });
  }

  handleQuery = e => {
    e.preventDefault();
    const typed = e.target.value;
    this.setState({ query: typed });
    this.setState({
      activeLoading: true,
      loadMessage: "Loading the application...",
      display: 'flex'
    });

    if (typed.length > 0) {
      search(typed)
        .then(result => {
          if (result.hasOwnProperty("error")) {
            this.setState({ books: [] });
          } else {
            const mapped = result.map(item => {
              if (!item.shelf) {
                item.shelf = "none";
                return item;
              } else {
                return item;
              }
            });
            this.setState({ books: mapped });
          }
        })
        .then(() => {
          this.setState({
            activeLoading: false,
            loadMessage: '',
            display: 'none'
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    const {
      currentlyReading,
      wantToRead,
      read,
      none,
      books,
      query,
      activeLoading,
      loadMessage,
      display,
    } = this.state;
    return (
      <React.Fragment>
        <LoadingOverlay active={activeLoading} spinner text={loadMessage} style={{width: '100%', minHeight: '150vh', zIndex: '100', position: 'absolute', display: display }}/>
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
              books={books}
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
