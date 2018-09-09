import React from 'react';
import Shelf from '../Shelf/Shelf.jsx';

const Home = (props) => {
  const {
    updateBook, currentlyReading, wantToRead, read, none,
  } = props;
  return (
    <div className="home">
      <Shelf shelf={currentlyReading} updateBook={updateBook} />
      <Shelf shelf={wantToRead} updateBook={updateBook} />
      <Shelf shelf={read} updateBook={updateBook} />
    </div>
  );
};

export default Home;
