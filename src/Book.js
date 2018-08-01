import React from 'react'



class Book extends React.Component {
    

    render() {
        const book = this.props.book;
        const bookCover = book.imageLinks ? `url(${book.imageLinks.thumbnail})` : null
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: bookCover }}></div>
                        <div className="book-shelf-changer">
                            <select value={book.shelf || 'none'} onChange={(event) => this.props.updateBookShelf(book, event.target.value)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading" >Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    {<div className="book-title">{book.title}</div>}
                    {<div className="book-authors">{book.authors}</div>}
                </div>
            </li>
        )
    }
}

export default Book