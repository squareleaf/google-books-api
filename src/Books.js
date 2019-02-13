import React, { Component } from 'react';
import no_cover from './no_cover.png';

const API = 'https://www.googleapis.com/books/v1/volumes?maxResults=40&q=';
const DEFAULT_QUERY = 'classics';
var searchValue = '';

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      value: ""
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

    this.setState({value: searchValue});
  }

  render() {
    const { books } = this.state;

    return (
      <div>
        <div className="search_container">
          <form onSubmit={this.handleSubmit} className="search_form">
            <label>
              Search Title or Author<br />
              <input name="value" type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>

        <div className="book_container">
          {books.map((book, id) =>
            <div key={id} className="book">
              <div className="image_container"><img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : no_cover} alt={book.volumeInfo.title} /></div>
              <div><a href={book.volumeInfo.infoLink}>{book.volumeInfo.title}</a></div>
              {book.volumeInfo.authors.map((author, id) =>
                <div key={id}>{author}</div>
              )}
              <div className="publisher">{book.volumeInfo.publisher}</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Books;
