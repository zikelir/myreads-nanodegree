import React from 'react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import BookCard from '../BookCard/BookCard.jsx';
import { getAll, search } from '../../BooksAPI';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      allBooks: [],
    };
  }

  componentDidMount() {
    getAll().then((result) => {
      this.setState({ allBooks: result });
    });
  }

  handleQuery = (e) => {
    e.preventDefault();
    const typed = e.target.value;
    this.setState({ query: typed.trim() });
  };

  render() {
    const { query, allBooks } = this.state;
    let showingBooks;
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingBooks = allBooks.filter(book => match.test(book.title));
    } else {
      showingBooks = allBooks;
    }

    showingBooks.sort(sortBy('title'));

    return (
      <div className="search">
        <div />
        <div className="search__header">Search books</div>
        <input
          type="text"
          placeholder="Search contacts..."
          value={query}
          onChange={this.handleQuery}
          className="search__bar"
        />
        {query.length === 0 || showingBooks.length > 0 ? showingBooks.map(item => (
          <BookCard
            book={item}
            key={item.id}
          />
        )) : 'no results found'}
      </div>
    );
  }
}

export default Search;
