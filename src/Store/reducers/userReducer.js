import { ADD_USER, UPDATE_USER } from "../types/user"

const DEFAULT_STATE = {
    userList : [
        {
            id: 1,
            maSV: 'A1',
            fullname: 'Hieu',
            phoneNumber: '082084345',
            email: 'hieunv0708@gmail.com',         
        },
        {
            id: 2,
            maSV: 'A2',
            fullname: 'Sol',
            phoneNumber: '082084345',
            email: 'Solnv0708@gmail.com',         
        },  
    ],
    selectedUser : null,
}

export const userReducer = (state = DEFAULT_STATE, {type, payload}) => {
    switch (type) {
        case ADD_USER : {
            const data = [...state.userList];

            data.push({...payload, id: Date.now()});

            state.userList = data;

            return{...state};
        }
        case 'SET_SELECTED_USER' : {
            return {...state, selectedUser: payload}
        }
        case UPDATE_USER : {
            state.userList = state.userList.map(ele => ele.id === payload.id ? payload: ele)
            state.selectedUser = null;
            return {...state}
        }
        case 'DELETE_USER': {
            state.userList = state.userList.filter(ele => ele.id !== payload);

            return {...state}
        }
        default:
        return state
    }
}