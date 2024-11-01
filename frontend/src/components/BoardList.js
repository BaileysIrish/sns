import React, { useEffect, useState } from 'react';
import { getPosts } from '../api/userApi';

function BoardList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await getPosts();
            setPosts(data);
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <h2>게시판</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.boardNumber}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <span>조회수: {post.viewCount}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BoardList;