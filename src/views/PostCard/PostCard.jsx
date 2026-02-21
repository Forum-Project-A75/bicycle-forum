import './PostCard.css';
import { Link } from "react-router-dom";
import { createLogger, LOG_MODULES } from '../../debug/debug';

  const log = createLogger(LOG_MODULES.POST_CARD);

  const defaultAvatar = '../../../images/default.png';


export default function PostCard({ post }) {
  log.log(post);

  return (
    <Link to={`/post/${post.id}`} className="post-card-link">
      <div className="post-card">

        <div className="post-left">
          <div className="votes">
            ▲ {post.votes ?? 0}
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
              src={post.author_avatar ?? defaultAvatar}
              alt="avatar"
            />

            <span className="author">{post.author_handle}</span>

            <span className="date">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}