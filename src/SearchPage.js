import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchPage extends React.Component {

    search = (event) => {
        BooksAPI.search(event.target.value).then(resp => {
            const comparedBooks = resp.map() //TBC
        })
    }

    render() {
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
                    
                </ol>
            </div>
        )
    }
}

export default SearchPage