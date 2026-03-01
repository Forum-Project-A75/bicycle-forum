import { useEffect, useState, useCallback, useRef } from 'react';
import PostCard from '../../views/PostCard/PostCard';
import UserCombobox from '../UsersCombo/UsersCombo';
import { createLogger, LOG_MODULES } from '../../debug/debug';
import { PAGE_SIZE } from '../../constants';
import {
  getPostPageAdmin,
  getUserPostPageAdmin,
  getPostDirectComments,
} from '../../Services/posts.services/post.services';

const log = createLogger(LOG_MODULES.SHOW_POSTS_ADMIN);

export default function ShowPostsAdmin() {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const offsetRef = useRef(0);

  const loadPosts = useCallback(
    async (reset = false, user = selectedUser) => {
      if (loading) return;
      setLoading(true);

      try {
        let postsData = [];
        if (user === null) {
          postsData = await getPostPageAdmin(offsetRef.current, PAGE_SIZE);
        } else {
          postsData = await getUserPostPageAdmin(
            offsetRef.current,
            PAGE_SIZE,
            user.uid,
          );
        }

        const enrichedPosts = await Promise.all(
          postsData.map(async (post) => {
            const data = await getPostDirectComments(post.id);

            return {
              ...post,
              comment_count: data[0]?.comment_count ?? 0,
              upvotes: data[0]?.upvotes ?? 0,
              downvotes: data[0]?.downvotes ?? 0,
            };
          }),
        );

        if (reset) {
          setPosts(enrichedPosts);
          offsetRef.current = enrichedPosts.length;
          setHasMore(true);
        } else {
          setPosts((prev) => [...prev, ...enrichedPosts]);
          offsetRef.current += enrichedPosts.length;
        }

        if (enrichedPosts.length < PAGE_SIZE) {
          setHasMore(false);
        }
      } catch (err) {
        log.error(err);
      } finally {
        setLoading(false);
      }
    },
    [loading, selectedUser],
  );

  useEffect(() => {
    offsetRef.current = 0;
    setPosts([]);
    setHasMore(true);
    loadPosts(true);
  }, [selectedUser]);

  // --- Show All бутон ---
  const handleShowAll = () => {
    setSelectedUser(null);
    offsetRef.current = 0;
    setPosts([]);
    setHasMore(true);
    loadPosts(true, null);
  };

  return (
    <div>
      <h2>All Posts</h2>

      {}
      <UserCombobox
        value={selectedUser}
        onChange={setSelectedUser}
        placeholder="Select a user..."
      />

      <button onClick={handleShowAll}>Show All</button>

      {}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} isAdminView={true} />
      ))}

      {}
      {hasMore && (
        <button onClick={() => loadPosts(false)} disabled={loading}>
          {loading ? 'Loading...' : 'Load more posts'}
        </button>
      )}
    </div>
  );
}
