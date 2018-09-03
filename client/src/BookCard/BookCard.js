import React from "react";

class BookCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: "" };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    alert("Your favorite flavor is: " + this.state.value);
    event.preventDefault();
  };

  render() {
    const { allBooks, categoryColor } = this.props;
    return (
      <div className="book-card">
        <div
          className="book-card__header"
          style={{ backgroundImage: `URL(${allBooks.imageLinks.thumbnail})` }}
        >
        <select className="book-card__button" value={this.state.value}>
            <option value="" disabled><i>Move to...</i></option>
            <option value="CurrentlyReading">Currently Reading</option>
            <option value="WantToRead">Want to read</option>
            <option value="Read">Read</option>
            <option value="None">No category</option>
        </select>
        </div>
        <div
          className="book-card__body"
          style={{ backgroundColor: categoryColor }}
        >
          <span>{allBooks.title}</span>
          <span className="book-card__authors">
            <b>From:</b> <i>{allBooks.authors.map(item => item)}</i>
          </span>
        </div>
      </div>
    );
  }
}

export default BookCard;
