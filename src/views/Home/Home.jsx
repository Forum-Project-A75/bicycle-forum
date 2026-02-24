import './Home.css';
import { getStatistics } from '../../Services/db.statistics.services/statistics.services.js';
import { useEffect, useState } from "react";
import {getLatestPosts, getMostCommentedPosts} from '../../Services/db.statistics.services/statistics.services.js';
//import PostCard from '../PostCard/PostCard.jsx';
import HomePostCard from '../HomePostCard/HomePostCard.jsx';
import { createLogger, LOG_MODULES } from '../../debug/debug.js';
import { HOME_GET_LATEST_POSTS_COUNT, HOME_GET_MOST_COMMENTED_POSTS_COUNT } from '../../constants.js';
import { getPostDirectComments } from '../../Services/posts.services/post.services.js';

const log = createLogger(LOG_MODULES.HOME);



export default function Home() {
  const [data, setData] = useState(null);
  const [postsData, setPostsData] = useState({latestPosts: null, mostCommented: null});
  useEffect(() => {
    async function fetchStats() {
      try {
        const result = await getStatistics();
        setData(result);
      } catch (error) {
        log.error(error.message);
      }
    }

    fetchStats();
  }, []);


  useEffect(() => {
    async function fetchPostsData() {
      try {
        const resultLatestPosts = await getLatestPosts(HOME_GET_LATEST_POSTS_COUNT);
        log.log("resultLatestPosts: ", resultLatestPosts);


        const enrichedLatestPosts = await Promise.all(
                resultLatestPosts.map(async (post) => {
                  const data = await getPostDirectComments(post.id);
                  log.log("resultLatestPosts data: ", data);
        
                  return {
                    ...post,
                    comment_count: data[0].comment_count,
                    upvotes: data[0].upvotes,
                    downvotes: data[0].downvotes
                  };
                })
              );


        setPostsData(prev => ( {
          ...prev,
          latestPosts: enrichedLatestPosts
        } ) );
      } 
      catch (error) {
        log.error(error.message);
      }

      try {
        const resultMostCommentedPosts = await getMostCommentedPosts(HOME_GET_MOST_COMMENTED_POSTS_COUNT);
        log.log("resultMostCommentedPosts: ", resultMostCommentedPosts);

        const enrichedMostCommentedPosts = await Promise.all(
                resultMostCommentedPosts.map(async (post) => {
                  const data = await getPostDirectComments(post.id);
                  log.log("resultMostCommentedPosts data: ", data);
        
                  return {
                    ...post,
                    comment_count: data[0].comment_count,
                    upvotes: data[0].upvotes,
                    downvotes: data[0].downvotes
                  };
                })
              );

        setPostsData(prev => ( {
          ...prev,
          mostCommented: enrichedMostCommentedPosts
        } ) );
      } 
      catch (error) {
        log.error(error.message);
      }
    }

    fetchPostsData();
  }, []);

  return (
    <>
      <div id="home">
        <div>Forum statistics</div>
        <div>
           <label> Users: {data ? data[0].users_count : "Loading..."} </label>
           <label> Posts: {data ? data[0].posts_count : "Loading..."} </label>
        </div>
        <div className="posts-sections">
          <div className="posts-column">
            <h2>Latest Posts</h2>
            {postsData.latestPosts &&
             postsData.latestPosts.map(post => (<HomePostCard key={post.id} post={post} />))}
          </div>
          <div className="posts-column">
            <h2>Most Commented</h2>
            {postsData.mostCommented &&
             postsData.mostCommented.map(post => (<HomePostCard key={post.id_} post={post} />))}
          </div>
        </div>
      </div>
    </>
  );
}


