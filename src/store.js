import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


let newStore = {
    list: []
}

const save = (list) => {
    localStorage.setItem('data', JSON.stringify(list));
}

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_LIST':
            const addList = [...state.list, { ...action.payload }];
            save(addList);
            return { ...state, list: addList };
        case 'REMOVE_LIST':
            const remList = state.list.filter((e, i) => i !== action.payload);
            save(remList);
            return { ...state, list: remList };
        case 'CH_LIST':
            const list = [...state.list];
            list.splice(action.payload.bookId, 1, action.payload.obj);
            save(list);
            return { ...state, list: list, save: true };
        case 'GET_LIST':
            const payload = JSON.parse(localStorage.getItem('data'));
            return { ...state, list: payload };
        default:
            return newStore
    }
    console.log(state);
}

export default createStore(reducer, applyMiddleware(thunk));