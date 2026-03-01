import { useEffect, useState } from "react";
//import { supabase } from "../supabaseClient";
//import PostCard from "./PostCard";
import PostCard from "../PostCard/PostCard";
import { getAllTags } from "../../Services/db.services/tags.services";
import { createLogger, LOG_MODULES } from "../../debug/debug";
import { getPostsFiltereByTag } from "../../Services/posts.services/post.services";
import { getCommentsFiltered, getPostStats } from "../../Services/posts.services/post.services";

const log = createLogger(LOG_MODULES.TAGS);

export default function PostsTags() {

  const [tags, setTags] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeTag, setActiveTag] = useState(null);

  // load all tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getAllTags();
        log.log("fetchTags: tags: ", tags);
        setTags(tags);
      }
      catch(err) {
        log.error("fetchTags: ", err.message, err);
      }
    };

    fetchTags();
  }, []);

  const handleTagClick = async (tagId) => {
    setActiveTag(tagId);

    
    try {
        const tagedPostsData = await getPostsFiltereByTag(tagId);


         const enrichedPosts = await Promise.all(
                  tagedPostsData.map(async (post) => {
                    //const data = await getPostDirectComments(post.id);
                    //const data = await getCommentsFiltered(post.id);
                    const data = await getPostStats(post.id);
                    return {
                      ...post,
                      comment_count: data[0]?.comment_count ?? 0,
                      upvotes: data[0]?.upvotes ?? 0,
                      downvotes: data[0]?.downvotes ?? 0,
                    };
                  })
                );

        setPosts(enrichedPosts);
    }
    catch(err) {
        log.error("handleTagClick: ", err);
    }
  };

  return (
    <div>

      {/* TAG BUTTONS */}
      <div style={{ marginBottom: "20px" }}>
        {tags.map(tag => (
          <button
            key={tag.id}
            onClick={() => handleTagClick(tag.id)}
            style={{
              marginRight: "10px",
              background: activeTag === tag.id ? "#ccc" : "#fff"
            }}
          >
            {tag.name}
          </button>
        ))}
      </div>

      {/* POSTS */}
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}

    </div>
  );
}