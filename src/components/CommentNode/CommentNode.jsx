import CommentsCreator from "../CommentsCreator/CommentsCreator";
import { useState } from "react";
import { useAuth } from "../../hoc/auth-context";
import VotePanel from "../VotePanel/VotePanel";


export default function CommentNode({ comment }) {

    const [replying, setReplying] = useState(false);
    const {user} = useAuth();

    return (
    
       <div style={{ marginLeft: "20px", borderLeft: "1px solid gray", paddingLeft:"10px" }}>
      
        <div>
           <b>{comment.handle}</b>
        </div>

      <div>{comment.content}</div>

      <button onClick={() => setReplying(true)}>Reply</button>
      {replying && (<CommentsCreator userId={user.id} parentId={comment.id} setReplying={setReplying} />)}
       
      {<VotePanel postId={comment.id}  score={comment.score} upvotes={comment.upvotes} downvotes={comment.downvotes} userVote={comment.my_vote}/>}

      {/* ДЕЦАТА */}
      {comment.children.map(child =>
        <CommentNode key={child.id} comment={child} />
      )}

    </div>
  );
}