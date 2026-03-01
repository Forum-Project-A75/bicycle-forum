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
  setTree,
}) {
  const handleUp = () => {
    voteChange(postId, +1);
  };

  const handleDown = () => {
    voteChange(postId, -1);
  };

  function voteNode(node, voteType) {
    const oldVote = node.my_vote;

    // press the same button do not have to change anything
    if (voteType === oldVote) return node;

    // press the same button
    //const newVote = (oldVote === voteType) ? 0 : voteType;
    const newVote = voteType;

    let newUpvotes = node.upvotes;
    let newDownvotes = node.downvotes;

    // remove old voice
    if (oldVote === 1) {
      newUpvotes--;
    } else if (oldVote === -1) {
      newDownvotes--;
    }

    // add new voice
    if (newVote === 1) {
      newUpvotes++;
    } else if (newVote === -1) {
      newDownvotes++;
    }

    return {
      ...node,
      upvotes: newUpvotes,
      downvotes: newDownvotes,
      my_vote: newVote,
    };
  }

  function updateNodeVote(node, targetId, voteType) {
    if (!node) return node;

    if (node.id === targetId) {
      return voteNode(node, voteType);
    }

    if (node.children && node.children.length > 0) {
      let changed = false;

      const newChildren = node.children.map((child) => {
        const updatedChild = updateNodeVote(child, targetId, voteType);

        if (updatedChild !== child) {
          changed = true;
        }

        return updatedChild;
      });

      if (changed) {
        return {
          ...node,
          children: newChildren,
        };
      }
    }

    return node;
  }

  const voteChange = async (post_id, value) => {
    setTree((prevTree) => updateNodeVote(prevTree, post_id, value));
    try {
      const data = await vote(post_id, value);
      log.log('voteChange data: ', data);
    } catch (error) {
      log.error('voteChange: ', error.message);
      setTree((prevTree) => updateNodeVote(prevTree, post_id, -value));
    }
  };

  return (
    <div className="vote-panel">
      <button
        style={userVote === 1 ? { backgroundColor: '#646cff' } : {}}
        className={userVote === 1 ? 'up active' : 'up'}
        onClick={handleUp}
      >
        ᐃ
      </button>

      <div
        className="score"
        style={
          score > 0
            ? { color: '#4caf50' }
            : score < 0
              ? { color: '#f44336' }
              : { color: 'lightgray' }
        }
      >
        {score}
      </div>

      <button
        style={userVote === -1 ? { backgroundColor: '#646cff' } : {}}
        className={userVote === -1 ? 'down active' : 'down'}
        onClick={handleDown}
      >
        ᐁ
      </button>

      <div className="details">
        <p>{upvotes} ᐃ</p> <p>{downvotes} ᐁ</p>
      </div>
    </div>
  );
}
