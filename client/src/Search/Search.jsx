import React from 'react';
import BookCard from '../BookCard/BookCard.jsx';
import allowedTerms from './allowedTerms';
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { books, handleQuery, query, updateBook } = this.props;
    return (
      <div className="search">
        <div className="search__header">
          Search books
          <input
            type="text"
            placeholder="Search contacts..."
            value={query}
            onChange={handleQuery}
            className="search__bar"
          />
        </div>
        <div className="search__allowed-terms"><b>Allowed search terms:</b> {allowedTerms.map(item => item + ', ')}</div>
        <div className="search__books">
          {(books && query.length > 0) && books.map(item => (
            <BookCard
              book={item}
              key={item.id}
              updateBook={updateBook}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Search;
