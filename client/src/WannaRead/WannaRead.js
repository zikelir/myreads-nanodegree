import React from 'react';
import BookCard from '../BookCard/BookCard';

class WannaRead extends React.Component {
  render() {
    const { wantToRead, updateBook } = this.props;
    return (
      <div className="wanna-read">
        <div className="wanna-read__header">Want to Read</div>
        <div className="book-cards">
          {wantToRead
            && wantToRead.map(item => (
              <BookCard
                book={item}
                categoryColor="#005744"
                updateBook={updateBook}
                key={item.id}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default WannaRead;
