import { useState, useEffect } from 'react';

const PostCards = () => {
  const [posts, setPosts] = useState<{ id: number; title: string; body: string; }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []); // boş array ekledik

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="postcards-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '20px' }}>
      {posts.map(post => (
        <div key={post.id} className="postcard" style={{
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '10px' }}>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default PostCards;
