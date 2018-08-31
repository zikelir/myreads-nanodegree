import React from "react";

class BookCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { allBooks } = this.props;
    return (
      <div className="book-cards">
      {console.log(allBooks)}
        {allBooks &&
            allBooks.map(item => (
              <div className="book-card">
                <div className="book-card__header" style={{backgroundImage: `URL(${item.imageLinks.thumbnail})`}}>
                  <div className="book-card__info">{item.title}</div>
                </div>
                <div className="book-card__body">{' '}</div>
              </div>
            ))
        }
      </div>
    );
  }
}

export default BookCard;
{
  /* <div className="book-card">
        <div className="book-card__header"></div>
        <div className="book-card__body"></div>
      </div> */
}
