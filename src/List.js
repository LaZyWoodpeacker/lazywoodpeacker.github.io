import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import defaultImg from './defimg';
import delIcon from './del.svg';
import editIcon from './edit.svg';


function List(props) {
    const [bookName, setBookName] = useState('');
    const [bookAutor, setBookAutor] = useState('');
    const [curId, setCurId] = useState(0);
    const [bookImg, setBookImg] = useState('');
    const [showDlg, setShowDlg] = useState('none');
    const [dlgType, setDlgType] = useState(true);
    const bookNameInput = useRef();
    const bookAutorInput = useRef()

    const getData = () => disp => {
        const payload = JSON.parse(localStorage.getItem('data'));
        disp({ type: 'GET_LIST', payload });
    }

    const addToList = (payload) => disp => {
        disp({ type: 'ADD_LIST', payload });
    }

    const chList = (payload) => disp => {
        console.log(payload);
        disp({ type: 'CH_LIST', payload });
    }

    const removeFromList = (payload) => disp => {
        disp({ type: 'REMOVE_LIST', payload });
    }

    useEffect(() => {
        if (localStorage.getItem('data')) {
            props.dispatch(getData());
        };
    }, []);

    return (<div className="app">
        <div className="dialog" style={{ display: showDlg }}>
            <div className="dialog__wnd">
                <input ref={bookNameInput} className="dialog__text" placeholder="Название" value={bookName} onChange={e => setBookName(e.target.value)}></input>
                <input ref={bookAutorInput} className="dialog__text" placeholder="Автор" value={bookAutor} onChange={e => setBookAutor(e.target.value)}></input>
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
                        {dlgType ? "Добавить обложку" : "Изменить обложку"}
                    </div>
                </div>
                <div className="dialog__btnblock">
                    <button className="dialog__btn" onClick={e => {
                        if (bookName.length && bookAutor.length) {
                            if (dlgType) {
                                props.dispatch(addToList({ bookName, bookAutor, bookImg }))
                            } else {
                                props.dispatch(chList({ obj: { bookName, bookAutor, bookImg }, curId }))
                            }
                            setShowDlg('none')
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
                    }}>{dlgType ? "Добавить" : "Изменить"}</button>
                    <button className="dialog__btn" onClick={e => {
                        setShowDlg('none')
                    }}>Отмена</button>
                </div>
            </div>
        </div>
        <ul className="mainlist">
            {props.list.map((em, i) => {
                return (<li key={"book-" + i} className="card">
                    <p className="mainlist__info">{em.bookName}</p>
                    <p className="mainlist__info">{em.bookAutor}</p>
                    <div className="card__img" style={{ backgroundImage: `url(${em.bookImg})` }}>
                    </div>
                    <div className="mainlist__btnblock">
                        <button className="mainlist_btn" onClick={e => {
                            setCurId(i);
                            setBookName(props.list[i].bookName);
                            setBookAutor(props.list[i].bookAutor);
                            setBookImg(props.list[i].bookImg);
                            setDlgType(false);
                            setShowDlg('flex');
                        }}><img src={editIcon} alt="edit" /></button>
                        <button className="mainlist_btn mainlist_btn-del" onClick={e => props.dispatch(removeFromList(i))}>
                            <img src={delIcon} alt="del" />
                        </button>
                    </div>
                </li>)
            })}
        </ul >
        <button className="float" onClick={e => {
            setDlgType(true);
            setBookName('');
            setBookAutor('');
            setBookImg(defaultImg);
            setShowDlg('flex');
        }}>+</button>
    </div >);
}

export default connect(store => ({ ...store }))(List);