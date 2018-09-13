import React from "react";
import { getAll, search } from "../../BooksAPI";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      allBooks: [],
      filtered: '',
    };
  }

  componentDidMount() {
    getAll().then((result) => {
      this.setState({ allBooks: result });
    });
  }

  handleQuery = (e) => {
    e.preventDefault();
    const typed = e.target.value;
    this.setState({ query: typed });
    const auxArr = [];
    search(typed).then((result) => {
      const filteredBook = result.filter(item => console.log((item.title === typed), item, typed));
      auxArr.push(filteredBook);
      console.log(auxArr);
      this.setState({ filtered: auxArr });
    });
  }

  render() {
    const { query, allBooks, filtered } = this.state;
    return (
      <div className="search">
        <div />
        <div className="search__header">Search books</div>
        <input type="text" value={query} onChange={this.handleQuery} className="search__bar" />
        <div>{JSON.stringify(allBooks)}</div>
        <h1>{JSON.stringify(filtered)}</h1>
      </div>
    );
  }
}

export default Search;
