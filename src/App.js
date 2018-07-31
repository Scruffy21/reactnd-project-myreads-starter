import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import SearchPage from './SearchPage'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  constructor(props) {
    super(props);
    BooksAPI.getAll().then(resp => this.setState({ books: resp }))
  }
 
  updateBookShelf = (bookToChange, shelf) => {
    BooksAPI.update(bookToChange, shelf);
    this.setState(prevState => {

      const newBooks = prevState.books.map(book => {
        if (book.id === bookToChange.id) {
          book.shelf = shelf
        }
        return book
      })
      return {books: newBooks}
    })
  }

  render() {
    const books = this.state.books;
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchPage books={this.state.books} updateBookShelf={this.updateBookShelf} />
        )}
        />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books.filter(book => book.shelf === 'currentlyReading').map(book => (
                        <Book book={book} key={book.id} updateBookShelf={this.updateBookShelf} />
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {books.filter(book => book.shelf === 'wantToRead').map(book => (
                        <Book book={book} key={book.id} updateBookShelf={this.updateBookShelf} />
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {books.filter(book => book.shelf === 'read').map(book => (
                        <Book book={book} key={book.id} updateBookShelf={this.updateBookShelf} />
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link
                to='/search'
              >Add a book</Link>
            </div>
          </div>
        )}
        />
      </div>
    )
  }
}

export default BooksApp
