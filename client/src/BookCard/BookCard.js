import React from "react";

class BookCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { allBooks, categoryColor } = this.props;
    return (
        <div className="book-card">
          <div
            className="book-card__header"
            style={{ backgroundImage: `URL(${allBooks.imageLinks.thumbnail})` }}
          />
          <div className="book-card__body" style={{backgroundColor: categoryColor}}>
            <span>{allBooks.title}</span>
            <span className="book-card__authors"><b>From:</b> <i>{allBooks.authors.map(item => item)}</i></span>
          </div>
        </div>
    );
  }
}

export default BookCard;
