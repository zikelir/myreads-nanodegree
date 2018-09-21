import React from 'react';
import BookCard from '../BookCard/BookCard';

const Shelf = (props) => {
  const { shelf, updateBook } = props;
  return (
    shelf && (
      <div className={shelf.css.blockClass}>
        <div className={shelf.css.headerClass}>
          {shelf.component.shelfLabel}
        </div>
        <div className="book-cards">
          {shelf.books &&
            shelf.books.map(item => (
              <BookCard
                book={item}
                categoryColor={shelf.css.categoryColor}
                updateBook={updateBook}
                key={item.id}
              />
            ))}
        </div>
      </div>
    )
  );
};

export default Shelf;
