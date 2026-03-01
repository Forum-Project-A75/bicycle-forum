import './HomePostCard.css';
import { Link } from "react-router-dom";
//import { createLogger, LOG_MODULES } from '../../debug/debug';

  //const log = createLogger(LOG_MODULES.POST_CARD);

  const defaultAvatar = '../../../images/default.png';


export default function HomePostCard({ post }) {
  //log.log(post);

  return (
   
      <div className="post-card">

        <div className="post-left">
          <div className="votes">
            ▲ {post.upvotes ?? 0}
          </div>

          <div className="votes">
            ▼ {post.downvotes ?? 0}
          </div>

          <div className="comments">
            💬 {post.comment_count ?? 0}
          </div>
        </div>

        <div className="post-main">
          <h3 className="post-title">{post.title}</h3>

          <div className="post-meta">
            <img
              className="avatar"
              src={post.avatar_url ?? defaultAvatar}
              alt="avatar"
            />

            <span className="author">{post.author_handle}</span>

            <span className="date">
              {new Date(post.created_on).toLocaleDateString()}
            </span>
          </div>
        </div>

      </div>
  );
}