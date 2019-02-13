import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.onSearchChange(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSearchChange(event.target.value);
  }

  render() {
    const searchString = this.props.searchString;

    return (
      <div className="search_container">
        <form onSubmit={this.handleSubmit} className="search_form">
          <label>
            Search Title or Author<br />
            <input type="text" value={searchString} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }

}
export default Search;
