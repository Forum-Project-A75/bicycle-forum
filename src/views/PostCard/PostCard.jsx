import './PostCard.css';
//import {getLatestPosts, getMostCommentedPosts} from '../../Services/db.statistics.services/statistics.services.js';
//import { useState, useEffect } from 'react';

export default function PostCard(post) {
    // const [data, setData] = useState({});

    //   useEffect(() => {
    //     async function fetchStats() {
    //       try {
    //         const result = await getStatistics();
    //         setData(result);
    //       } catch (error) {
    //         console.log(error.message);
    //       }
    //     }
    
    //     fetchStats();
    //   }, []);
    
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