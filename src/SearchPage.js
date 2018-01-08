import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class SearchPage extends Component {

  state = {
    query : '',
    books : []
  }

  searchBook = (event) => {
    const query = event.target.value.trim()
    this.setState( { query: query })
    BooksAPI.search(query, 20).then(books => {
      this.setState({ books })
    })
  }

  render() {
    const {query, books} = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={ query }
              onChange={this.searchBook}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ListBooks
            books={this.state.books}
            updateShelf={this.props.updateShelf}
          />
        </div>
      </div>
    )
  }
}

export default SearchPage
