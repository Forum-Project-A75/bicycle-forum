import './MyPostsCard.css';
import { createLogger, LOG_MODULES } from '../../debug/debug';

const log = createLogger(LOG_MODULES.MY_POSTS_CARD);
const defaultAvatar = '../../../images/default.png';

export default function MyPostCard({ post, onClick }) {
  log.log(post);

  return (
    <div 
      className="post-card-link"
      onClick={() => onClick && onClick(post.id)}
      style={{ cursor: "pointer" }}
    >
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
          </div>
        </div>
      </div>
    </div>
  );
}