import React from 'react';
import PropTypes from 'prop-types';

class BookCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedInput: '',
      options: [
        {
          value: 'currentlyReading',
          label: 'Currently Reading',
        },
        {
          value: 'wantToRead',
          label: 'Want To Read',
        },
        {
          value: 'read',
          label: 'Read',
        },
        {
          value: 'none',
          label: 'No Category',
        },
      ],
    };
  }

  updateState = (e) => {
    e.preventDefault();
    const { book, updateBook } = this.props;
    const clickedItem = e.target.value;
    updateBook(book, clickedItem);
  };

  render() {
    const { book, categoryColor } = this.props;
    const { options, selectedInput } = this.state;
    return (
      <div className="book-card">
        <div
          className="book-card__header"
          style={{ backgroundImage: `URL(${book.imageLinks.thumbnail})` }}
        >
          <select
            className="book-card__button"
            value={selectedInput}
            onChange={e => this.updateState(e)}
          >
            <option value="" disabled>Move to...</option>
            {options.map(option => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div
          className="book-card__body"
          style={{ backgroundColor: categoryColor }}
        >
          <span>{book.title}</span>
          <span className="book-card__authors">
            <b>From:</b>
            {' '}
            <i>{book.authors.map(item => item)}</i>
          </span>
        </div>
      </div>
    );
  }
}

BookCard.propTypes = {
  updateBook: PropTypes.func.isRequired,
  categoryColor: PropTypes.string.isRequired,
  book: PropTypes.shape({}).isRequired,
};

export default BookCard;
