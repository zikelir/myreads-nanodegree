import React from "react";

class BookCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedInput: '',
    }
  }

  updateState = (e) => {
    const { book, updateBook } = this.props;
    const clickedItem = e.target.value;
    updateBook(book, clickedItem);
  }

  render() {
    const { book, categoryColor } = this.props;
    return (
      <div className="book-card">
        <div
          className="book-card__header"
          style={{ backgroundImage: `URL(${book.imageLinks.thumbnail})` }}
        >
          <select className="book-card__button" value={this.state.selectedInput}  onChange={(e) => this.updateState(e)}>
              <option disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to read</option>
              <option value="read">Read</option>
              <option value="none">No category</option>
          </select>
        </div>
        <div
          className="book-card__body"
          style={{ backgroundColor: categoryColor }}
        >
          <span>{book.title}</span>
          <span className="book-card__authors">
            <b>From:</b> <i>{book.authors.map(item => item)}</i>
          </span>
        </div>
      </div>
    );
  }
}

export default BookCard;
