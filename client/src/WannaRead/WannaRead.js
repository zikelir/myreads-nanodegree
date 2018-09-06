import React from "react";
import BookCard from "../BookCard/BookCard";
class WannaRead extends React.Component {
  render() {
    const { allBooks, updateBook } = this.props;
    return (
      <div className="wanna-read">
        <div className="wanna-read__header">Want to Read</div>
        <div className="book-cards">
          {allBooks &&
            allBooks.map(
              item =>
                item.shelf === "wantToRead" && (
                  <BookCard book={item} categoryColor={'#005744'}  key={item.id} updateBook={updateBook} />
                )
            )}
        </div>
      </div>
    );
  }
}

export default WannaRead;
