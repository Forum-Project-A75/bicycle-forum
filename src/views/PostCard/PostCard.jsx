import './PostCard.css';
import { Link } from 'react-router-dom';
import { createLogger, LOG_MODULES } from '../../debug/debug';

const log = createLogger(LOG_MODULES.POST_CARD);

const defaultAvatar = '../../../images/default.png';

export default function PostCard({ post, isAdminView = false }) {
  log.log(post);

  return (
    <Link to={`/post/${post.id}`} className="post-card-link">
      <div
        style={
          post.status === 'Hidden'
            ? { border: '2px solid blue' }
            : post.status === 'Locked'
              ? { border: '2px solid orange' }
              : post.status === 'Deleted'
                ? { border: '2px solid red' }
                : {}
        }
        className="post-card"
      >
        <div className="post-left">
          <div className="votes">▲ {post.upvotes ?? 0}</div>

          <div className="votes">▼ {post.downvotes ?? 0}</div>

          <div className="comments">💬 {post.comment_count ?? 0}</div>
        </div>
        <div className="post-meta">
          <div className="postcard-author-info">
            <img
              className="avatar"
              src={post.avatar ?? defaultAvatar}
              alt="avatar"
            />
            <span className="author">{post.handle}</span>
          </div>

          <h3 className="post-title">{post.title || 'Untitled Post'}</h3>

          <div className="postcard-bottom">
            {isAdminView && <div className="post-status">{post.status}</div>}

            <span className="date">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
