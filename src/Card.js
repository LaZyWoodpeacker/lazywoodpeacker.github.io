import React from 'react';


export default function Card({ bookId, bookAutor, bookName, bookImg, delBook, editBook }) {
    return (<li className="card">
        <p className="mainlist__info">{bookAutor}</p>
        <p className="mainlist__info">{bookName}</p>
        <div className="card__img" style={{ backgroundImage: `url(${bookImg})` }}>
        </div>
        <div className="mainlist__btnblock">
            <button className="mainlist_btn" onClick={e => editBook({ bookAutor, bookName, bookImg, bookId })}>
                <img src="img/edit.svg" alt="edit" />
            </button>
            <button className="mainlist_btn mainlist_btn-del" onClick={e => delBook(bookId)}>
                <img src="img/del.svg" alt="del" />
            </button>
        </div>
    </li >)
}