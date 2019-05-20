import { Api } from '../../../helpers/ApiClient';

export class Post {
    static async getAllPosts() {
        try {
            const response = await Api.client.get('/api/post');
            return {
                status: response.status,
                data: response.data,
            }
        } catch (e) {
            console.error('error getAllPosts', e);
            return {
                status: 'error getAllPosts',
            };
        }
    }

    static async addPost(body) {
        try {
            const response = await Api.client.post('/api/post', body);
            return {
                status: response.status,
                data: response.data,
            }
        } catch (e) {
            console.error('error addPost', e);
            return {
                status: 'error addPost',
            };
        }
    }

    static async deletePost(id) {
        try {
            const response = await Api.client.delete(`/api/post/${id}`);
            return {
                status: response.status,
            }
        } catch (e) {
            console.error('error deletePost', e);
            return {
                status: 'error deletePost',
              };
        }
    }
}