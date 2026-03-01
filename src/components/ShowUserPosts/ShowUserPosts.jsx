import { useEffect, useState, useCallback, useRef } from 'react';
import MyPostCard from '../../views/MyPostsCard/MyPostsCard';
import {
  getUserPostPageEspeciallyForUser,
  getPostStats,
} from '../../Services/posts.services/post.services';
import PostEditor from '../../views/PostEditor/PostEditor';
import { createLogger, LOG_MODULES } from '../../debug/debug';
import { PAGE_SIZE } from '../../constants';
import { useAuth } from '../../hoc/auth-context';
import './ShowUserPosts.css';

const log = createLogger(LOG_MODULES.SHOW_POSTS);

export default function ShowUserPosts() {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [editingPostId, setEditingPostId] = useState(null);

  const offsetRef = useRef(0);
  const didInitialLoad = useRef(false);

  const loadMorePosts = useCallback(async () => {
    if (loading) return;
    if (!hasMore) return;

    setLoading(true);

    try {
      const newPosts = await getUserPostPageEspeciallyForUser(
        offsetRef.current,
        PAGE_SIZE,
        user.id,
      );
      console.log('Fetched posts:', newPosts);

      const enrichedPosts = await Promise.all(
        newPosts.map(async (post) => {
          const data = await getPostStats(post.id);

          return {
            ...post,
            comment_count: data[0].comment_count,
            upvotes: data[0].upvotes,
            downvotes: data[0].downvotes,
          };
        }),
      );

      setPosts((prev) => [...prev, ...enrichedPosts]);

      offsetRef.current += PAGE_SIZE;

      if (enrichedPosts.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } catch (err) {
      log.error(err);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, user.id]);

  useEffect(() => {
    if (didInitialLoad.current) return;
    didInitialLoad.current = true;

    loadMorePosts();
  }, [loadMorePosts]);

  return (
    <div id="show-user-posts">
      <h2>My Posts</h2>

      {posts.map((post) => (
        <MyPostCard
          key={post.id}
          post={post}
          onClick={(id) => setEditingPostId(id)}
        />
      ))}

      {hasMore && (
        <button onClick={loadMorePosts} disabled={loading}>
          {loading ? 'Loading...' : 'Load more posts'}
        </button>
      )}

      {editingPostId && (
        <PostEditor
          postId={editingPostId}
          onSave={() => {
            setEditingPostId(null);
          }}
        />
      )}
    </div>
  );
}
