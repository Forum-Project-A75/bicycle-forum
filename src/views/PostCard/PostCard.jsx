import './PostCard.css';

export default function PostCard(post) {
//     {
//     post_id: 5,
//     title: "Bitcoin again?",
//     content: "...",
//     created_on: "...",
//     author_handle: "Satoshi",
//     comments_count: 23
//   }

    return (
    <>
      <div id="postcard">
        <div>
           <h2>{post.title}</h2>
           <h4>{post.handle}</h4>
           <p>{post.content}</p>
        </div>
      </div>
    </>
  );
} 