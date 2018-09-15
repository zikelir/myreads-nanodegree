import React from 'react';
import BookCard from '../BookCard/BookCard.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { books, handleQuery, query } = this.props;

    return (
      <div className="search">
        <div />
        <div className="search__header">Search books</div>
        <input
          type="text"
          placeholder="Search contacts..."
          value={query}
          onChange={handleQuery}
          className="search__bar"
        />
        <div className="search__books">
          {books && query.length > 0 ? books.map(item => (
            <BookCard
              book={item}
              key={item.id}
            />
          )) : (<h1></h1>)}
        </div>
      </div>
    );
  }
}

export default Search;
