import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import Dialog from './Dialog';

const getData = () => disp => {
    disp({ type: 'GET_LIST' });
}

const addToList = (payload) => disp => {
    disp({ type: 'ADD_LIST', payload });
}

const chList = (payload) => disp => {
    disp({ type: 'CH_LIST', payload });
}

const removeFromList = (payload) => disp => {
    disp({ type: 'REMOVE_LIST', payload });
}

function List(props) {
    const [showDlg, setShowDlg] = useState(false);
    const [currentBook, setCurrentBook] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('data')) {
            props.dispatch(getData());
        };
    }, []);

    return (<div className="app">
        <ul className="mainlist">
            {props.list.map((em, key) => {
                return <Card
                    {...em}
                    key={"bookId-" + key}
                    bookId={key}
                    editBook={book => {
                        setCurrentBook(book);
                        setShowDlg(true);
                    }}
                    delBook={bookId => {
                        props.dispatch(removeFromList(bookId))
                    }}
                />
            })}
        </ul >
        <button className="float" onClick={e => {
            setCurrentBook({
                "bookAutor": "",
                "bookName": "",
                "bookImg": "",
                "bookId": -1
            })
            setShowDlg(true);
        }}>+</button>
        <Dialog
            showDlg={showDlg}
            book={currentBook}
            onCancel={e => setShowDlg(false)}
            onOk={({ bookAutor, bookName, bookImg, bookId }) => {
                if (bookId === -1) {
                    props.dispatch(addToList({ bookAutor, bookName, bookImg }))
                } else {
                    props.dispatch(chList({ obj: { bookAutor, bookName, bookImg }, bookId }))
                }
                setShowDlg(false)
            }}
        />
    </div >);
}

export default connect(store => ({ ...store }))(List);