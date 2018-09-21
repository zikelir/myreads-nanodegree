import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import Popup from 'reactjs-popup';
import BookCard from '../BookCard/BookCard';
import allowedTerms from './allowedTerms';

const Search = (props) => {
  const { books, handleQuery, query, updateBook } = props;
  return (
    <div className="search">
      <div className="search__header">
        <div>Search books</div>
        <div className="search__header-info">
          <Popup
            trigger={(
              <DebounceInput
                minLength={0}
                debounceTimeout={250}
                value={query}
                onChange={handleQuery}
                className="search__bar"
              />
            )}
            on="focus"
            position="bottom center"
            className="popup-search"
            closeOnDocumentClick
          >
            <div className="" id="popup-search">
              <b>Allowed Search Terms</b>
              <hr style={{ height: '2px', backgroundColor: 'black' }} />
              <i>{allowedTerms.map(item => `${item}, `)}</i>
            </div>
          </Popup>
        </div>
      </div>
      <div className="search__books">
        {books
        && query.length > 0
        && books.map(item => (
          <BookCard book={item} key={item.id} updateBook={updateBook} />
        ))}
      </div>
    </div>
  );
};

export default Search;
