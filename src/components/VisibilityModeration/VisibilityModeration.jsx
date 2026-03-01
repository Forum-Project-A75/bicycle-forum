import './VisibilityModeration.css';
import { useState } from 'react';
import { post_statuses } from '../../constants';
import { updatePostStatus } from '../../Services/posts.services/post.services';

export default function VisibilityModeration({ post_status_id, post_id }) {
  const [visibility, setVisibility] = useState(post_status_id);

  const setVisibilityStatus = async (newStatusId) => {
    setVisibility(newStatusId);
    try {
      await updatePostStatus(post_id, newStatusId);
    } catch (error) {
      console.error('Error updating post status:', error);
    }
  };

  return (
    <div className="visibility-moderation">
      <div className="visibility-dropdown">
        <button className="dropbtn">{post_statuses[visibility]}</button>
        <div className="dropdown-content">
          <a href="#" onClick={() => setVisibilityStatus(1)}>
            {post_statuses[1]}
          </a>
          <a href="#" onClick={() => setVisibilityStatus(2)}>
            {post_statuses[2]}
          </a>
          <a href="#" onClick={() => setVisibilityStatus(3)}>
            {post_statuses[3]}
          </a>
          <a href="#" onClick={() => setVisibilityStatus(4)}>
            {post_statuses[4]}
          </a>
        </div>
      </div>
    </div>
  );
}
