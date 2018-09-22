import React, { Component } from 'react';
import Popup from 'reactjs-popup';

class BookCard extends Component {
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
    const { book } = this.props;
    const { options, selectedInput } = this.state;
    const image = book.imageLinks ? book.imageLinks.thumbnail : null;
    const colors = {
      none: '#5f27cd',
      wantToRead: '#005744',
      read: '#b33939',
      currentlyReading: '#273c75',
    };
    const label = {
      none: 'No category',
      wantToRead: 'Want to read',
      read: 'Already read',
      currentlyReading: 'Currently reading',
    };
    return (
      <div className="book-card">
        <div
          className="book-card__header"
          style={{ backgroundImage: `URL('${image}')` }}
        >
          <select
            className="book-card__button"
            value={selectedInput}
            onChange={e => this.updateState(e)}
          >
            <option value="" disabled>
              Move to...
            </option>
            {options.map(option => (
              <option
                value={option.value}
                key={option.value}
                disabled={book.shelf === option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div
          className="book-card__body"
          style={{ backgroundColor: colors[book.shelf] }}
        >
          <span>{book.title}</span>
          <span className="book-card__authors">
            <b>From:</b>
            {' '}
            <i>
              {book.authors ? book.authors.map(item => item) : 'no authors'}
            </i>
            <p>
              <b>Status: </b>
              { label[book.shelf] }
            </p>
          </span>
          <div className="book-card__popup">
            <Popup
              trigger={<div className="book-card__popup-open">i</div>}
              className='popup-book'
            >
              <div className="book-card__popup-container">
                <span><b>Book Summary</b></span>
                <hr style={{ height: '2px', backgroundColor: 'black' }} />
                <ul>
                  <li>
                    <b>Title:</b>
                    {' '}
                    {book.title}
                  </li>
                  <li>
                    <b>Author(s):</b>
                    {' '}
                    {book.authors
                      ? book.authors.map(item => item)
                      : 'no authors'}
                  </li>
                  <li>
                    <b>Preview on:</b>
                    <a
                      href={book.previewLink ? book.previewLink : ''}
                      target="blank"
                    >
                      {' '}
                      {book.previewLink ? 'Preview' : 'No preview'}
                    </a>
                  </li>
                  <li>
                    <b>Language:</b>
                    {' '}
                    { book.language ? book.language : 'No language' }
                  </li>
                  <li>
                    <b>Number of pages:</b>
                    {' '}
                    {book.pageCount ? book.pageCount : 'Not provided'}
                  </li>
                </ul>
              </div>
            </Popup>
          </div>
        </div>
      </div>
    );
  }
}

export default BookCard;
