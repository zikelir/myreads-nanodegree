import React from "react";
import CurrentlyReading from "../CurrentlyReading/CurrentlyReading.js";
import WannaRead from "../WannaRead/WannaRead.js";
import Read from "../Read/Read.js";
import { getAll, update } from "../../BooksAPI.js";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentlyReading: [],
      wantToRead: [],
      read: []
    };
  }

  componentDidMount() {
    getAll().then(response => {
      this.composeBooks(response);
    });
  }

  composeBooks(books) {
    const currentlyReading = [];
    const wantToRead = [];
    const read = [];

    books.map(item => {
      if (item.shelf === "currentlyReading") {
        currentlyReading.push(item);
      }
      if (item.shelf === "wantToRead") {
        wantToRead.push(item);
      }
      if (item.shelf === "read") {
        read.push(item);
      }
    });

    this.setState({ currentlyReading, wantToRead, read });
  }

  updateShelf = (bookCopy, currentShelf, newShelf) => {
    const currentShelfCopy = this.state[currentShelf];
    const newShelfCopy = this.state[newShelf];

    if (currentShelf !== newShelf) {
      bookCopy.shelf = newShelf;
      newShelfCopy.push(bookCopy);
    }

    const pastShelf = currentShelfCopy.filter(item => {
      return item.id !== bookCopy.id;
    });

    this.setState({ [newShelf]: newShelfCopy, [currentShelf]: pastShelf });
  };

  updateBook = (book, newShelf) => {
    const bookCopy = book;
    const currentShelf = book.shelf; // current book shelf

    if (currentShelf !== newShelf) {
      update(bookCopy, newShelf)
        .then(() => {
          this.updateShelf(bookCopy, currentShelf, newShelf);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      console.log("same shelf");
    }
  };

  render() {
    const { currentlyReading, wantToRead, read } = this.state;
    return (
      <div className="home">
        <CurrentlyReading
          currentlyReading={currentlyReading}
          updateBook={this.updateBook}
        />
        <WannaRead wantToRead={wantToRead} updateBook={this.updateBook} />
        <Read read={read} updateBook={this.updateBook} />
      </div>
    );
  }
}

export default Home;
