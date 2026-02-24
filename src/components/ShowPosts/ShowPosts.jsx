import { useEffect, useState, useCallback, useRef } from "react";
import PostCard from "../../views/PostCard/PostCard";
import { getPostPage, getPostDirectComments } from "../../Services/posts.services/post.services";
import { createLogger, LOG_MODULES } from "../../debug/debug";
import { PAGE_SIZE } from "../../constants";

const log = createLogger(LOG_MODULES.SHOW_POSTS);

export default function ShowPosts() {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const offsetRef = useRef(0);
  const didInitialLoad = useRef(false);

  const loadMorePosts = useCallback(async () => {
    if (loading) return;          
    if (!hasMore) return;         

    setLoading(true);

    try {
      const newPosts = await getPostPage(offsetRef.current, PAGE_SIZE);

      const enrichedPosts = await Promise.all(
        newPosts.map(async (post) => {
          const data = await getPostDirectComments(post.id);

          return {
            ...post,
            comment_count: data[0].comment_count,
            upvotes: data[0].upvotes,
            downvotes: data[0].downvotes
          };
        })
      );

      setPosts(prev => [...prev, ...enrichedPosts]);

      offsetRef.current += PAGE_SIZE;

      if (newPosts.length < PAGE_SIZE) {
        setHasMore(false);
      }

    } catch (err) {
      log.error(err);
    } finally {
      setLoading(false);
    }

  }, [loading, hasMore]);

  useEffect(() => {
    if (didInitialLoad.current) return;
    didInitialLoad.current = true;

    loadMorePosts();
  }, [loadMorePosts]);

  return (
    <div>
      <h2>All Posts</h2>

      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}

      {hasMore && (
        <button onClick={loadMorePosts} disabled={loading}>
          {loading ? "Loading..." : "Load more posts"}
        </button>
      )}
    </div>
  );
}