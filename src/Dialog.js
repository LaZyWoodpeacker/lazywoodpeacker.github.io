import Redux from 'redux';
import { useState, useEffect, useRef } from 'react';
import defaultImg from './defimg';

export default function Dialog({ book, showDlg, onOk, onCancel }) {
    const [bookName, setBookName] = useState('');
    const [bookAutor, setBookAutor] = useState('');
    const [bookImg, setBookImg] = useState('');
    const bookNameInput = useRef();
    const bookAutorInput = useRef();

    useEffect(() => {
        if (book.bookId !== -1) {
            setBookAutor(book.bookAutor);
            setBookName(book.bookName);
            setBookImg(book.bookImg);
        } else {
            setBookAutor('');
            setBookName('');
            setBookImg(defaultImg);
        }
    }, [book])

    if (!showDlg) { return null; }

    return (<div className="dialog" style={{ display: 'flex' }}>
        <div className="dialog__wnd">
            <input ref={bookAutorInput} className="dialog__text" placeholder="Автор" value={bookAutor || ''} onChange={e => setBookAutor(e.target.value)}></input>
            <input ref={bookNameInput} className="dialog__text" placeholder="Название" value={bookName || ''} onChange={e => setBookName(e.target.value)}></input>
            <input type="file" id="file_input" className="dialog__file"></input>
            <div className="card__img dialog__img" style={{ backgroundImage: `url(${bookImg})` }}
                onClick={e => {
                    let fileloader = document.getElementById('file_input');
                    fileloader.onchange = e => {
                        const reader = new FileReader();
                        if (fileloader.files[0]) {
                            reader.readAsDataURL(fileloader.files[0]);
                            reader.onload = () => {
                                setBookImg(reader.result.toString());
                                fileloader.onchange = null;
                            }
                        } else {
                            setBookImg(defaultImg)
                        }

                    }
                    fileloader.click();
                }}>
                <div className="dialog__imageplaceholder">
                    {(book.bookId === -1) ? "Добавить обложку" : "Изменить обложку"}
                </div>
            </div>
            <div className="dialog__btnblock">
                <button className="dialog__btn" onClick={e => {
                    if (bookName.length && bookAutor.length) {
                        onOk({ bookName, bookAutor, bookImg, bookId: book.bookId })
                    } else {
                        if (!bookName.length) {
                            bookNameInput.current.style.border = '1px solid red';
                        }
                        if (!bookAutor.length) {
                            bookAutorInput.current.style.border = '1px solid red';
                        }
                        setTimeout(() => {
                            bookNameInput.current.style.border = 'none';
                            bookAutorInput.current.style.border = 'none';
                        }, 500)
                    }
                }}>{(book.bookId === -1) ? "Добавить" : "Изменить"}</button>
                <button className="dialog__btn" onClick={e => onCancel(e)}>Отмена</button>
            </div>
        </div>
    </div>)
}