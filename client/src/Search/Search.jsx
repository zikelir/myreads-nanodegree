import React from "react";
import { getAll, search } from "../../BooksAPI";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  componentDidMount() {}

  handleQuery = (e) => {
    e.preventDefault();
    this.setState({ query: e.target.value });
  }

  render() {
    const { query } = this.state;
    return (
      <div className="search">
        <div />
        <div className="search__header">Search books</div>
        <input type="text" value={query} onChange={this.handleQuery} className="search__bar" />
      </div>
    );
  }
}

export default Search;
