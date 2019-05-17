import { 
    GET_ALL_POSTS,
    CREATE_POST,
    DELETE_POST,
} from './types';

let initialState = {
    posts: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POSTS:
            return {
                ...state,
                posts: action.payload,
            }
        case CREATE_POST:
        case DELETE_POST:
        default:
            return state;
    }
}