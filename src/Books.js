import React, { Component} from 'react';

const API = 'https://www.googleapis.com/books/v1/volumes?q=';
const DEFAULT_QUERY = 'stephen+king';

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    fetch(API + DEFAULT_QUERY)
      .then(response => response.json())
      .then(data => this.setState({ books: data.items }));
  }

  render() {
    const { books } = this.state;

    return (
      <div className="container">
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
              <td>{book.volumeInfo.imageLinks.thumbnail}</td>
            </tr>
          )}
        </tbody>
        </table>
      </div>
    );
  }
}

export default Books;
