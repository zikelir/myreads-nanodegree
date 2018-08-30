import React from 'react';
import BookCard from '../BookCard/BookCard';

class CurrentlyReading extends React.Component {
  render() {
    return (
      <div className="currently-reading">
        <div className="currently-reading__header">Currently Reading</div>
        <BookCard />
      </div>
    );
  }
}

export default CurrentlyReading;