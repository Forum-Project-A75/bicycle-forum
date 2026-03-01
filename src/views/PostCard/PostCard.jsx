import './PostCard.css';
import { Link } from 'react-router-dom';
import { createLogger, LOG_MODULES } from '../../debug/debug';

const log = createLogger(LOG_MODULES.POST_CARD);

const defaultAvatar = '../../../images/default.png';

export default function PostCard({ post, isAdminView = false }) {
  log.log(post);

  return (
    <Link to={`/post/${post.id}`} className="post-card-link">
      <div className="post-card">
        <div className="post-left">
          <div className="votes">▲ {post.upvotes ?? 0}</div>

          <div className="votes">▼ {post.downvotes ?? 0}</div>

          <div className="comments">💬 {post.comment_count ?? 0}</div>
        </div>

        <div className="post-main">
          <h3 className="post-title">{post.title}</h3>

          <div className="post-meta">
            <img
              className="avatar"
              src={post.avatar ?? defaultAvatar}
              alt="avatar"
            />

            <span className="author">{post.handle}</span>

            <span className="date">
              {new Date(post.created_at).toLocaleDateString()}
            </span>

            {isAdminView && <div className="post-status">{post.status}</div>}
          </div>
        </div>
      </div>
    </Link>
  );
}
