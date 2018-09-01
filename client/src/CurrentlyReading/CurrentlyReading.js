import React from "react";
import BookCard from "../BookCard/BookCard";
class CurrentlyReading extends React.Component {
  render() {
    const { allBooks } = this.props;
    return (
      <div className="currently-reading">
        <div className="currently-reading__header">Currently Reading</div>
        <div className="book-cards">
          {allBooks &&
            allBooks.map(
              item =>
                item.shelf === "currentlyReading" && (
                  <BookCard allBooks={item} />
                )
            )}
        </div>
      </div>
    );
  }
}

export default CurrentlyReading;
