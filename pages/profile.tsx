import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, deletePost, updatePost } from '../store/postsSlice';
import { selectUser } from '../store/userSlice';
import { UserState, PostsState } from '../store/types'

interface RootState {
    user: UserState;
    posts: PostsState;
}

interface Post {
    id: number;
    title: string;
    content: string;
}

export const Home = () => {
    const user = useSelector(selectUser);
    const posts = useSelector((state: RootState) => state.posts.posts);
    const dispatch = useDispatch();

    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [editingPost, setEditingPost] = useState<Post | null>(null);

    const handleAddPost = (e: React.FormEvent) => {
        e.preventDefault();
        const newPost = {
            id: Date.now(),
            title: newPostTitle,
            content: newPostContent,
        };
        dispatch(addPost(newPost));
        setNewPostTitle('');
        setNewPostContent('');
    };

    const handleEditPost = (post: Post) => {
        setEditingPost(post);
        setNewPostTitle(post.title);
        setNewPostContent(post.content);
    };

    const handleSavePost = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingPost) {
            dispatch(updatePost({
                id: editingPost.id,
                title: newPostTitle,
                content: newPostContent,
            }));
        }
        setEditingPost(null);
        setNewPostTitle('');
        setNewPostContent('');
    };

    useEffect(() => {
        const storedPosts = JSON.parse(sessionStorage.getItem('posts') || '[]');
        storedPosts.forEach((post: Post) => {
            dispatch(addPost(post));
        });
    }, []);

    return (
        <main className='profile'>
            <div className='profile__header'>
                <h1 className='profile__title'>Здравствуйте, {user.username}</h1>
                <p className='profile__email'>{user.email}</p>
            </div>
            <form className='profile__form' onSubmit={editingPost ? handleSavePost : handleAddPost}>
                <div className='profile__inputs'>
                    <div className='profile__title-group'>
                        <label className='profile__input-title' htmlFor="title">Заголовок:</label>
                        <input className='profile__input'
                            type="text"
                            id="title"
                            value={newPostTitle}
                            onChange={(e) => setNewPostTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className='profile__content-group'>
                        <label className='profile__input-title' htmlFor="content">Содержимое:</label>
                        <textarea className='profile__textarea'
                            id="content"
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                        />
                    </div>
                </div>
                <button className='profile__submit-button' type="submit">
                    {editingPost ? 'Сохранить изменения' : 'Создать заметку'}
                </button>
            </form>
            <h2 className='profile__title'>Заметки:</h2>
            {posts.length != 0 ?
                <ul className='profile__posts' >
                    {posts.map((post) => (
                        <li className='post' key={post.id}>
                            <h3 className='post__title' >{post.title}</h3>
                            <p className='post__content' >{post.content}</p>
                            <div className='post__buttons'>
                                <button className='post__button' onClick={() => handleEditPost(post)}>
                                    Редактировать
                                </button>
                                <button className='post__button' onClick={() => dispatch(deletePost(post.id))}>
                                    Удалить
                                </button>
                            </div>
                        </li>
                    ))}
                </ul> : <span className='profile__no-content'>Здесь пока ничего нет</span>
            }
        </main >
    );
};

export default Home;