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
      <div>
        <div className="search_container">
          <form onSubmit={this.handleSubmit} className="search_form">
            <label>
              Search Title or Author<br />
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>

        <div className="book_container">
          {books.map(book =>
            <div className="book">
              <div className="image_container"><img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : ''} alt={book.volumeInfo.title} /></div>
              <div><a href={book.volumeInfo.infoLink}>{book.volumeInfo.title}</a></div>
              <div>{book.volumeInfo.authors[0]}</div>
              <div className="publisher">{book.volumeInfo.publisher}</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Books;
