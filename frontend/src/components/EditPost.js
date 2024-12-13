import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, updatePost, deletePost } from '../api/userApi';

function EditPost() {
    const { postId } = useParams(); // URL에서 게시물 ID 가져오기
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState([]); // 새로 업로드할 파일 상태
    const [existingFiles, setExistingFiles] = useState([]); // 기존 파일 상태

    useEffect(() => {
        console.log("Received postId:", postId); // 디버깅 로그
        if (!postId || postId === "null") {
            alert("게시물 ID가 유효하지 않습니다.");
            navigate('/');
            return;
        }
        const fetchPost = async () => {
            try {
                const post = await getPostById(postId);
                setTitle(post.title);
                setContent(post.content);
                setExistingFiles(post.files || []);
            } catch (error) {
                alert('게시물을 불러오는 데 실패했습니다.');
                console.error(error);
            }
        };
        fetchPost();
    }, [postId, navigate]);

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!postId || postId === "null") {
            alert("유효하지 않은 게시물 ID입니다.");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);

        Array.from(files).forEach((file) => {
            formData.append('files', file);
        });

        try {
            await updatePost(postId, formData);
            alert('게시물이 수정되었습니다.');
            navigate('/');
        } catch (error) {
            alert('게시물 수정에 실패했습니다.');
            console.error(error);
        }
    };

    const handleDelete = async () => {
        if (!postId || postId === "null") {
            alert("유효하지 않은 게시물 ID입니다.");
            return;
        }
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            try {
                await deletePost(postId);
                alert("게시물이 삭제되었습니다.");
                navigate('/');
            } catch (error) {
                alert("게시물 삭제에 실패했습니다.");
                console.error(error);
            }
        }
    };

    return (
        <div>
            <h2>게시물 수정</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>내용</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>첨부 파일</label>
                    <ul>
                        {existingFiles.map((file, index) => (
                            <li key={index}>
                                {file.fileType.startsWith('image/') ? (
                                    <img
                                        src={file.fileUrl}
                                        alt={`첨부 이미지 ${index}`}
                                        style={{ maxWidth: '100px', height: 'auto' }}
                                    />
                                ) : file.fileType.startsWith('video/') ? (
                                    <video
                                        src={file.fileUrl}
                                        controls
                                        style={{ maxWidth: '100px', height: 'auto' }}
                                    />
                                ) : (
                                    <a href={file.fileUrl} download>
                                        {file.fileName || `첨부파일 ${index + 1}`}
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit">수정</button>
                <button type="button" onClick={handleDelete} style={{ marginLeft: '10px' }}>
                    삭제
                </button>
            </form>
        </div>
    );
}

export default EditPost;
