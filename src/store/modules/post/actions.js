import { 
    GET_ALL_POSTS,
    CREATE_POST,
    DELETE_POST,
} from './types';

import { Post } from './api';

export const getAllPostsAction = () => async dispatch => {
    const response = await Post.getAllPosts();
    console.log('response  getAllPostsAction', response);
    if (response.status === 200) {
        dispatch({
            type: GET_ALL_POSTS,
            payload: response.data.posts
        })
    }
};

export const addPostAction = (body) => async dispatch => {
    const response = await Post.addPost(body);
    console.log('response  addPostAction', response);
    if (response.status === 201) {
        dispatch({
            type: CREATE_POST,
            payload: response.data
        })
    }
};

export const deletePostAction = (id) => async dispatch => {
    const response = await Post.deletePost(id);
    console.log('response  deletePostAction', response);
    if (response.status === 200) {
        dispatch({
            type: DELETE_POST,
            id,
        });
    };
}