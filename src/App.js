import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
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
    console.log(this.state.books)
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link
                to='/'
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
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
                onClick={() => this.setState({ showSearchPage: true })}
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
