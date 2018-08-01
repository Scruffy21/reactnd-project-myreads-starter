import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchPage extends React.Component {

    libraryBooks = this.props.books

    state = {
        booksToDisplay: []
    }
    

    search = (event) => {
        BooksAPI.search(event.target.value)
            .then(resp => {
                const comparedBooks = resp.map((book) => {
                    let foundLibraryBook = null;
                    if (this.libraryBooks.some(libraryBook => {
                        if (libraryBook.id === book.id) {
                            foundLibraryBook = libraryBook;
                            return true;
                        }
                        return false;
                    })) {
                        return foundLibraryBook;
                    }
                    else {
                        return book;
                    }
                });
                this.setState({ booksToDisplay: comparedBooks })    
            })
            .catch(err => console.log(err))
    }

    render() {
        console.log(this.state.booksToDisplay);
        return (
            <div className="main-search">
                <div className="search-books">
                    <div className="search-books-bar">
                    <Link
                        to='/'
                        className="close-search"
                    >Close</Link>
                    <div className="search-books-input-wrapper">
                            <input type="text" placeholder="Search by title or author" onChange={this.search}/>
                    </div>
                    </div>
                    <div className="search-books-results">
                    <ol className="books-grid"></ol>
                    </div>
                </div>

                <ol className="books-grid">
                    {this.state.booksToDisplay.map(book => (<Book book={book} key={book.id} updateBookShelf={this.props.updateBookShelf}  />))}
                </ol>
            </div>
        )
    }
}

export default SearchPage