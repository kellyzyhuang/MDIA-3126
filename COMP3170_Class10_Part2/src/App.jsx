import { useEffect, useState, Fragment } from 'react';
import styled from 'styled-components';
import './App.css';

function App() {

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const [fetchStatus, setFetchStatus] = useState('idle');

  const isLoading = fetchStatus === 'loading';
  const isError = fetchStatus === 'error';

  const [post, setPost] = useState({
    title: '',
    body: '',
    userId: ''
  });

  function getAuthor(post) {
    return users.find(user => String(user.id) === String(post.userId));
  }

  useEffect(() => {
    async function fetchData() {
      let posts, users;
      try {
        setFetchStatus('loading');

        let [postsResp, usersResp] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/posts'),
          fetch('https://jsonplaceholder.typicode.com/users')
        ]);

        posts = await postsResp.json();
        users = await usersResp.json();

        setPosts(posts);
        setUsers(users);

        setFetchStatus('idle');
      } catch(e) {
        setFetchStatus('error');
        console.log(e.message);
      }
    }

    fetchData();

  }, []);

  function handleChange(e) {
    setPost({...post, [e.target.name] : e.target.value})
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      setPosts([...posts, data]);
  })
    .catch(error => console.error(error.message));
  }

  return (
    <>
    <Container>
      <h1>My blog posts</h1>

      <Form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="title">Title: </label>
          <input type="text" name="title" value={post.title} onChange={handleChange} />
        </p>
        <p>
          <label htmlFor="body">Body: </label>
          <textarea name="body" rows="5" cols="10" value={post.body} onChange={handleChange}>
            type here...
          </textarea>
        </p>
        <p>
          <label htmlFor="userId">Author: </label>
          <select name="userId" value={post.userId} onChange={handleChange}>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </p>
        <button>Submit</button>
      </Form>

      {isLoading ? 
      <p>Loading...</p>
    : isError ?
    <p>Error loading data</p>
    : 
    <>
      {posts.toReversed().map(post => {
  const author = getAuthor(post);

  return (
    <Post key={post.id}>
      <h2>{post.title}</h2>
      {author ? (
        <>
          By <a href={`https://${author.website}`} target="_blank" rel="noopener noreferrer">{author.name}</a>
        </>
      ) : (
        <p>Author not found</p>
      )}
      <p>{post.body}</p>
    </Post>
  );
})}

    </>
    }
    </Container>
    </>
  )
}

const Container = styled.div`
  padding: 1rem;
  text-align: left;
  max-width: 500px;

  h1 {
    text-align: center;
  }
`;

const Post = styled.div`
  padding: 1rem 0.5rem;
  margin-top: 1.5rem;

  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 25%);
`;

const Form = styled.form`
  margin: 1rem 0;
  padding: 0.5rem 1em;
  background-color: #eee;

  p {
    display: flex;
    justify-content: space-between;  
  }

  p * {
    flex-basis: 50%;

  }

`;
export default App
