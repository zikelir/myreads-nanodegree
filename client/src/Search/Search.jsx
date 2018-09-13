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
        <div>Search books</div>
        <input type="text" value={query} onChange={this.handleQuery} />
        {query}
      </div>
    );
  }
}

export default Search;
