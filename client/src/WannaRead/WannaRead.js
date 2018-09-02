import React from "react";
import BookCard from "../BookCard/BookCard";
class WannaRead extends React.Component {
  render() {
    const { allBooks } = this.props;
    return (
      <div className="wanna-read">
        <div className="wanna-read__header">Want to Read</div>
        <div className="book-cards">
          {allBooks &&
            allBooks.map(
              item =>
                item.shelf === "wantToRead" && (
                  <BookCard allBooks={item} categoryColor={'#005744'}  key={item.title}/>
                )
            )}
        </div>
      </div>
    );
  }
}

export default WannaRead;
