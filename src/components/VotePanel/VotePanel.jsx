import { vote } from '../../Services/posts.services/post.services';
import { createLogger, LOG_MODULES } from '../../debug/debug';
import './VotePanel.css';

const log = createLogger(LOG_MODULES.VOTE_PANEL);

export default function VotePanel({
  postId,
  score,
  upvotes,
  downvotes,
  userVote,
}) {
  const handleUp = () => {
    //onVoteChange(postId, +1);
    voteChange(postId, +1);
  };

  const handleDown = () => {
    //onVoteChange(postId, -1);
    voteChange(postId, -1);
  };

  const voteChange = async (post_id, value) => {
    try {
      const data = await vote(post_id, value);
      log.log('voteChange data: ', data);
    } catch (error) {
      log.error('voteChange: ', error.message);
    }
  };

  return (
    <div className="vote-panel">
      <button
        className={userVote === 1 ? 'up active' : 'up'}
        onClick={handleUp}
      >
        ᐃ
      </button>

      <div className="score">{score}</div>

      <button
        className={userVote === -1 ? 'down active' : 'down'}
        onClick={handleDown}
      >
        ᐁ
      </button>

      <div className="details">
        ↑ {upvotes} ↓ {downvotes}
      </div>
    </div>
  );
}
