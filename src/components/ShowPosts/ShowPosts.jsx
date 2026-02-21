 import { useEffect, useState, useCallback, useRef } from "react";
import PostCard from "../../views/PostCard/PostCard";
import { getPostPage } from "../../Services/posts.services/post.services";
//import { useSearchParams } from "react-router-dom";

export default function ShowPosts() {
  const [posts, setPosts] = useState([]);
  const PAGE_SIZE = 10;
  const [hasMore, setHasMore] = useState(true);
  const offsetRef = useRef(0);
  //const [searchParams] = useSearchParams();

  // тук добавям малко логика! което може и да не е толкозва добре, но на този етап така ще го реализирам! 
  // на следващ етап може да имам няколко контрола! Но пък ще има доста повторения на кода! не знам кое е по добре! 
  // тук май повтарянето на кода не е толкова зле! 
  //const tag = searchParams.get("tag");
  //const user = searchParams.get("user");
  //const sort = searchParams.get("sort");

  const loadMorePosts = useCallback(async () => {
      const newPosts = await getPostPage(offsetRef.current, PAGE_SIZE);
      setPosts(prev => [...prev, ...newPosts]);
      offsetRef.current += PAGE_SIZE;

      if (newPosts.length < PAGE_SIZE) {
          setHasMore(false);
      }

  }, []);

  const initialLoad = useRef(false);
  useEffect(() => {
    if (initialLoad.current) return;
    initialLoad.current = true;

    loadMorePosts();
  }, [loadMorePosts]);

  return (
    <div>
      <h2>All Posts</h2>

      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
      {hasMore && (<button onClick={loadMorePosts}>Load more comments</button>)}
    </div>
  );
}