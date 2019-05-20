import { 
    GET_ALL_POSTS,
    CREATE_POST,
    DELETE_POST,
} from './types';

import { Post } from './api';

export const getAllPostsAction = () => async dispatch => {
    const response = await Post.getAllPosts();
    if (response.status === 200) {
        dispatch({
            type: GET_ALL_POSTS,
            payload: response.data.posts
        })
    }
};

export const addPostAction = (body) => async (dispatch, getState) => {
    const response = await Post.addPost(body);
    if (response.status === 201) {
        const { posts: { posts } } = getState();
        dispatch({
            type: CREATE_POST,
            payload: [...posts, response.data.post._doc]
        })
    }
};

export const deletePostAction = (id) => async (dispatch, getState) => {
    const response = await Post.deletePost(id);
    if (response.status === 200) {
        const { posts: { posts } } = getState();
        const newData = posts.filter(el => el._id !== id);
        dispatch({
            type: DELETE_POST,
            payload: newData,
        });
    };
}