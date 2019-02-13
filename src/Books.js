import React, { Component } from 'react';

class Books extends Component {

  render() {
    const { books } = this.props.books;

    return (
      <div>
        <div className="book_container">
          {books.map(book =>
            <div className="book">
              <div className="image_container"><img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : ''} alt={book.volumeInfo.title} /></div>
              <div><a href={book.volumeInfo.infoLink}>{book.volumeInfo.title}</a></div>
              {book.volumeInfo.authors.map(author =>
                <div>{author}</div>
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
