import React from "react";
import BookCard from "../BookCard/BookCard";
class Read extends React.Component {
  render() {
    const { read, updateBook } = this.props;
    return (
      <div className="read">
        <div className="read__header">Read</div>
        <div className="book-cards">
          {read &&
            read.map(item =>(
                  <BookCard
                    book={item}
                    categoryColor={"#b33939"}
                    updateBook={updateBook}
                    key={item.id}
                  />
                )
            )}
        </div>
      </div>
    );
  }
}

export default Read;
