import React from 'react';
import BookCard from '../BookCard/BookCard';

class CurrentlyReading extends React.Component {
  render() {
    const { currentlyReading, updateBook } = this.props;
    return (
      <div className="currently-reading">
        <div className="currently-reading__header">Currently Reading</div>
        <div className="book-cards">
          {currentlyReading
            && currentlyReading.map(item => (
              <BookCard
                book={item}
                categoryColor="#273c75"
                updateBook={updateBook}
                key={item.id}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default CurrentlyReading;
