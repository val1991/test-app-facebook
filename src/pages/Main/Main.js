import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../store/modules/post/actions';

import AddPostForm from '../../components/AddPostForm';

const Main = (props) => {
    const { posts } = props;
    useEffect(() => {
        getAllPosts();
    }, []);

    const getAllPosts = async () => {
        const { getAllPostsAction } = props;
        await getAllPostsAction();
    }

    const handleAddPost = async (values, setSubmitting, resetForm) => {
        const body = {
            user_name: values.name,
            post_text: values.text,
            post_date: values.date,
        };
        const { addPostAction } = props;
        await addPostAction(body);
        setSubmitting(false);
        resetForm();
    }

    const handleDeletePost = async (id) => {
        const { deletePostAction } = props;
        await deletePostAction(id);
    }

    return (
        <div>
            <AddPostForm handleSubmit={handleAddPost}/>
            <div>
                <h1>All pending posts</h1>
                <div>
                    {posts.map(post => (
                        <div key={post._id}>
                            <h3>Post text - {post.post_text}</h3>
                            <h3>Post date - {new Date(post.post_date).toString()}</h3>
                            <h3>Name - {post.user_name}</h3>
                            <button onClick={() => handleDeletePost(post._id)}>Delete Post</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
function mapStateProps(state) {
    return {
        posts: state.posts.posts,
    };
  }
  export default connect(
    mapStateProps,
    actions,
  )(Main);