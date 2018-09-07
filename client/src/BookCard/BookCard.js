import React from "react";

class BookCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedInput: '',
      options: [
        {
          value: '',
          label: '',
        },
        {
          value: 'Currently Reading',
          label: 'currentlyReading',
        },
        {
          value: 'wantToRead',
          label: 'Want To Read',
        },
       {
          value: 'read',
          label: 'Read',
        },
        // {
        //   value: 'none',
        //   label: 'Remove'
        // }
      ]
    }
  }

  updateState = (e) => {
    e.preventDefault();
    const { book, updateBook } = this.props;
    console.log(e.target.value);
    const clickedItem = e.target.value;
    updateBook(book, clickedItem);
  }

  render() {
    const { book, categoryColor } = this.props;
    const { options } = this.state;

    return (
      <div className="book-card" key={book.id}>
        <div
          className="book-card__header"
          style={{ backgroundImage: `URL(${book.imageLinks.thumbnail})` }}
        >
          <select className="book-card__button" value={this.state.selectedInput}  onChange={(e) => this.updateState(e)}>
              {
                options.map((option) => {
                 return <option value={option.value}>{option.label}</option>
                })
              }
          </select>
        </div>
        <div
          className="book-card__body"
          style={{ backgroundColor: categoryColor }}
        >
          <span>{book.title}</span>
          <span className="book-card__authors">
            <b>From:</b> <i>{book.authors.map(item => item)}</i>
          </span>
        </div>
      </div>
    );
  }
}

export default BookCard;
