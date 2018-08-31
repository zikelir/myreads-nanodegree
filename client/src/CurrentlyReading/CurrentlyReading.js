import React from 'react';
import BookCard from '../BookCard/BookCard';
import { getAll } from "../../BooksAPI.js";
class CurrentlyReading extends React.Component {
  state = { allBooks: [] };

  componentDidMount() {
    getAll().then(response => {
      this.setState({ allBooks: response });
    });
  }

  render() {
    return (
      <div className="currently-reading">
        <div className="currently-reading__header">Currently Reading</div>
        <BookCard allBooks={this.state.allBooks}/>
      </div>
    );
  }
}

export default CurrentlyReading;