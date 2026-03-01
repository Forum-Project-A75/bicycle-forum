import { useEffect, useState, useCallback, useRef } from 'react';
import PostCard from '../../views/PostCard/PostCard';
import UserCombobox from '../UsersCombo/UsersCombo';
import { createLogger, LOG_MODULES } from '../../debug/debug';
import { PAGE_SIZE } from '../../constants';
import {
  getPostPage,
  getUserPostPage,
  getPostDirectComments,
} from '../../Services/posts.services/post.services';

const log = createLogger(LOG_MODULES.SHOW_POSTS);

export default function ShowPosts() {
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
          postsData = await getPostPage(offsetRef.current, PAGE_SIZE);
        } else {
          postsData = await getUserPostPage(
            offsetRef.current,
            PAGE_SIZE,
            user.uid,
          );
        }

        const enrichedPosts = await Promise.all(
          postsData.map(async (post) => {
            const data = await getPostDirectComments(post.id);
            //const data = await getCommentsFiltered(post.id);

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
        <PostCard key={post.id} post={post} />
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

// import { useEffect, useState, useCallback, useRef } from "react";
// import PostCard from "../../views/PostCard/PostCard";
// import { getPostPage, getPostDirectComments} from "../../Services/posts.services/post.services";
// import { createLogger, LOG_MODULES } from "../../debug/debug";
// import { PAGE_SIZE } from "../../constants";
// import UserCombobox from "../UsersCombo/UsersCombo";
// import { getUserPostPage } from "../../Services/posts.services/post.services";

// const log = createLogger(LOG_MODULES.SHOW_POSTS);

// export default function ShowPosts() {
//   const [posts, setPosts] = useState([]);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);

//   const offsetRef = useRef(0);
//   const didInitialLoad = useRef(false);

//   const loadMorePosts = useCallback(async (reset) => {
//     if (loading) return;
//     //if (!hasMore) return;

//     if (!hasMore && !reset) return;

//     setLoading(true);

//     try {

//       let postsData = [];
//       if (selectedUser === null) {
//     postsData = await getPostPage(offsetRef.current, PAGE_SIZE);
//   } else {
//     postsData = await getUserPostPage(offsetRef.current, PAGE_SIZE, selectedUser.uid);
//   }

//       //const newPosts = await getPostPage(offsetRef.current, PAGE_SIZE);

//       const enrichedPosts = await Promise.all(
//         postsData.map(async (post) => {
//           const data = await getPostDirectComments(post.id);

//           return {
//             ...post,
//             comment_count: data[0].comment_count,
//             upvotes: data[0].upvotes,
//             downvotes: data[0].downvotes
//           };
//         })
//       );

//       if (reset) {
//         setPosts(enrichedPosts);
//         offsetRef.current = PAGE_SIZE;
//   } else {
//     setPosts(prev => [...prev, ...enrichedPosts]);
//      offsetRef.current += PAGE_SIZE;
//   }

//       //setPosts(prev => [...prev, ...enrichedPosts]);

//       //offsetRef.current += PAGE_SIZE;

//       if (enrichedPosts.length < PAGE_SIZE) {
//         setHasMore(false);
//       }

//     } catch (err) {
//       log.error(err);
//     } finally {
//       setLoading(false);
//     }

//   }, [loading, hasMore, selectedUser]);

//   useEffect(() => {
//   // reset when filter changes
//   offsetRef.current = 0;
//   setPosts([]);
//   setHasMore(true);
//   loadMorePosts(true);
// }, [selectedUser]);

//   useEffect(() => {
//     if (didInitialLoad.current) return;
//     didInitialLoad.current = true;

//     loadMorePosts(false);
//   }, [loadMorePosts]);

//   function handleShowAll() {
//   setSelectedUser(null);
// }

// function handleSelectedUser(user) {
//   setSelectedUser(user);
// }

//   return (
//     <div>
//       <h2>All Posts</h2>

//       <UserCombobox
//   value={selectedUser}
//   onChange={setSelectedUser}
// />

// <button onClick={() => {
//   console.log("Selected ID:", selectedUser?.uid);
//   //setSelectedUser(selectedUser);
//   handleSelectedUser(selectedUser);
// }}>
//   Submit
// </button>

// <button onClick={() => {handleShowAll();}}>
//   Show All
// </button>

//       {posts.map(post => (
//         <PostCard key={post.id} post={post} />
//       ))}

//       {hasMore && (
//         <button onClick={() => loadMorePosts(false)} disabled={loading}>
//           {loading ? "Loading..." : "Load more posts"}
//         </button>
//       )}
//     </div>
//   );
// }
