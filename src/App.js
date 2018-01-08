  import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import SearchPage from './SearchPage'

class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
        this.setState({ books })
    })
  }

  booksInShelf(shelf) {
    return this.state.books.filter(book => book.shelf === shelf)
  }

  updateShelf = (book, shelf) => {
      BooksAPI.update(book, shelf).then(response => {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })
      })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchPage
            updateShelf={this.updateShelf}
          />
        )}/>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <Shelf
                title="Currently Reading"
                books={this.booksInShelf("currentlyReading")}
                updateShelf={this.updateShelf}
              />
              <Shelf
                title="Read"
                books={this.booksInShelf("read")}
                updateShelf={this.updateShelf}
              />
              <Shelf
                title="Want To Read"
                books={this.booksInShelf("wantToRead")}
                updateShelf={this.updateShelf}
              />
              <div className="open-search">
                <Link to='/search'>Search Books</Link>
              </div>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
