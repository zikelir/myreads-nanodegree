import React from 'react';
import PropTypes from 'prop-types';
import Shelf from '../Shelf/Shelf';

const Home = (props) => {
  const {
    updateBook, currentlyReading, wantToRead, read,
  } = props;
  return (
    <div className="home">
      <Shelf shelf={currentlyReading} updateBook={updateBook} />
      <Shelf shelf={wantToRead} updateBook={updateBook} />
      <Shelf shelf={read} updateBook={updateBook} />
    </div>
  );
};

Home.propTypes = {
  updateBook: PropTypes.func.isRequired,
  currentlyReading: PropTypes.shape({
    books: PropTypes.array,
    component: PropTypes.object,
    css: PropTypes.object,
  }).isRequired,
  wantToRead: PropTypes.shape({
    books: PropTypes.array,
    component: PropTypes.object,
    css: PropTypes.object,
  }).isRequired,
  read: PropTypes.shape({
    books: PropTypes.array,
    component: PropTypes.object,
    css: PropTypes.object,
  }).isRequired,
};

export default Home;
