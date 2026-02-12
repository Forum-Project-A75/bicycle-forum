import './Home.css';
import { getStatistics } from '../../Services/db.statistics.services/statistics.services.js';
import { useEffect, useState } from "react";
import {getLatestPosts, getMostCommentedPosts} from '../../Services/db.statistics.services/statistics.services.js';
import PostCard from '../PostCard/PostCard.jsx';



export default function Home() {
  const [data, setData] = useState(null);
  const [postsData, setPostsData] = useState({latestPosts: null, mostCommented: null});
  useEffect(() => {
    async function fetchStats() {
      try {
        const result = await getStatistics();
        setData(result);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchStats();
  }, []);


  useEffect(() => {
    async function fetchPostsData() {
      try {
        const result = await getLatestPosts(10);
        setPostsData(prev => ( {
          ...prev,
          latestPosts: result
        }
          ));
      } catch (error) {
        console.log(error.message);
      }


      try {
        const result = await getMostCommentedPosts(10);
        setPostsData(prev => ( {
          ...prev,
          mostCommented: result
        }
          ));
      } catch (error) {
        console.log(error.message);
      }

    }

    fetchPostsData();
  }, []);



  return (
    <>
      <div id="home">
        <div>Forum statistics</div>
        <div>
           <label> Posts: {data ? data[0].users_count : "Loading..."} </label>
           <label> Posts: {data ? data[0].posts_count : "Loading..."} </label>
        </div>
        <div>
           {postsData.latestPosts && postsData.latestPosts.map(post => <PostCard key={post.post_id} post={post} />)}
           {postsData.mostCommented && postsData.mostCommented.map(post => <PostCard key={post.post_id} post={post} />)}
        </div>
      </div>
    </>
  );
}


