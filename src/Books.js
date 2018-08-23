import React, { Component } from 'react';

const API = 'https://www.googleapis.com/books/v1/volumes?q=';
const DEFAULT_QUERY = 'stephen+king';
var searchValue = '';

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({value: event.target.value});

    if (this.state.value === '') {
      searchValue = DEFAULT_QUERY;
    } else {
      searchValue = this.state.value;
    } 

    fetch(API + searchValue)
      .then(response => response.json())
      .then(data => this.setState({ books: data.items }));
  }

  render() {
    const { books } = this.state;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Authors</th>
            <th>Publisher</th>
          </tr>
          {books.map(book =>
            <tr>
              <td>{book.volumeInfo.title}</td>
              <td>{book.volumeInfo.authors}</td>
              <td>{book.volumeInfo.publisher}</td>
            </tr>
          )}
        </tbody>
        </table>
      </div>
    );
  }
}

export default Books;
