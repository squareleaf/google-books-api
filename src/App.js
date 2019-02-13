import React, { Component } from 'react';
import './App.css';
import Books from "./Books";
import Search from "./Search";

const API = 'https://www.googleapis.com/books/v1/volumes?q=';

class App extends Component {
  constructor(props) {
    super(props);
    this.callAPI = this.callAPI.bind(this);
    this.state = {
      searchString: ' ',
      books: []
    };
  }

  callAPI(event) {
    fetch(API + this.state.searchString)
      .then(response => response.json())
      .then(data => this.setState({ books: data.items }));
  }

  render() {
    const { books } = this.state;

    return (
      <div>
        <Search />
        <Books 
          books = { books }
          onSearchChange={this.callAPI} />
      </div>
    );
  }
}

export default App;
