import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
//import { getPostById } from "../../Services/db.services/post.services";
import {
  getComments,
  buildCommentTree,
} from '../../Services/posts.services/post.services';
import { createLogger, LOG_MODULES } from '../../debug/debug';
import CommentNode from '../../components/CommentNode/CommentNode';
import { useAuth } from '../../hoc/auth-context';
import CommentsCreator from '../../components/CommentsCreator/CommentsCreator';
import VotePanel from '../../components/VotePanel/VotePanel';
import './PostDetails.css';

const log = createLogger(LOG_MODULES.POST_DETAILS);

export default function PostDetails() {
  const { id } = useParams();
  const [tree, setTree] = useState(null);
  const [replying, setReplying] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const load = async () => {
      log.log('id: ', id);
      const data = await getComments(id);
      log.log('incoming post data: ', data);
      const postTree = buildCommentTree(data);
      log.log('tree data: ', postTree);
      setTree(postTree);
    };

    load();
  }, [id]);

  if (!tree) return <div>Loading post...</div>;

  return (
    <div id="post-details">
      <div id="post-container">
        {
          <VotePanel
            postId={tree.id}
            score={tree.score}
            upvotes={tree.upvotes}
            downvotes={tree.downvotes}
            userVote={tree.my_vote}
          />
        }
        <div>
          <h1>{tree.title}</h1>
          {tree.content}

          <button onClick={() => setReplying(true)}>Reply</button>

          {replying && (
            <CommentsCreator
              userId={user.id}
              parentId={tree.id}
              setReplying={setReplying}
            />
          )}
        </div>
      </div>

      <div id="comments-container">
        <h3>Comments</h3>
        {tree.children.map((c) => (
          <CommentNode key={c.id} comment={c} />
        ))}
      </div>
    </div>
  );
}
