import React from "react";
import BookCard from "../BookCard/BookCard";
class CurrentlyReading extends React.Component {
  render() {
    const { allBooks, updateBook } = this.props;
    return (
      <div className="currently-reading">
        <div className="currently-reading__header">Currently Reading</div>
        <div className="book-cards">
          {allBooks &&
            allBooks.map(
              item =>
                item.shelf === "currentlyReading" && (
                  <BookCard book={item} categoryColor={'#273c75'}  key={item.id} updateBook={updateBook} />
                )
            )}
        </div>
      </div>
    );
  }
}

export default CurrentlyReading;
