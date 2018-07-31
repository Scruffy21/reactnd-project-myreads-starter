import React from 'react'




class Book extends React.Component {
<<<<<<< HEAD

    // book = this.props.book
    render() {
        console.log(this.props)
=======
    
    render() {
        const book = this.props.book
>>>>>>> new
        return (
            <li>
                <div className="book">
                    <div className="book-top">
<<<<<<< HEAD
                        {/* <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: book.imageLinks.thumbnail }}></div> */}
=======
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
>>>>>>> new
                        <div className="book-shelf-changer">
                            <select value={book.shelf}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading" >Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    {/* <div className="book-title">{book.title}</div> */}
                    {/* <div className="book-authors">{book.authors}</div> */}
                </div>
            </li>
        )
    }
}

export default Book