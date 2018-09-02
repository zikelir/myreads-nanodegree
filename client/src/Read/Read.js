import React from "react";
import BookCard from "../BookCard/BookCard";
class CurrentlyReading extends React.Component {
  render() {
    const { allBooks } = this.props;
    return (
      <div className="read">
        <div className="read__header">Read</div>
        <div className="book-cards">
          {allBooks &&
            allBooks.map(
              item =>
                item.shelf === "read" && (
                  <BookCard allBooks={item} categoryColor={'#b33939'}  key={item.title}/>
                )
            )}
        </div>
      </div>
    );
  }
}

export default CurrentlyReading;
