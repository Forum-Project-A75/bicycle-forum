//import { supabase } from "../../config/supabase-config";
import { useState } from 'react';
import { validate } from './validate.data.js';
import { MAX_POST_CONTENT_LENGTH } from '../../constants.js';
import { createPost } from '../../Services/posts.services/post.services.js';
import { createLogger, LOG_MODULES } from '../../debug/debug.js';
import { useAuth } from '../../hoc/auth-context.jsx';
import './CommentsCreator.css';

const log = createLogger(LOG_MODULES.CREATE_COMMENT);

export default function CommentsCreator({
  userId,
  parentId,
  setReplying,
  setTree,
  username,
}) {
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});
  const { userData } = useAuth();

  log.log('incomming data: ', userId, parentId);

  function addCommentToTree(node, parentId, newComment) {
    if (node.id === parentId) {
      const newChildren = node.children
        ? [...node.children, newComment]
        : [newComment];
      return {
        ...node,
        children: newChildren,
      };
    }

    if (node.children && node.children.length > 0) {
      let changed = false;
      const newChildren = node.children.map((child) => {
        const updatedChild = addCommentToTree(child, parentId, newComment);
        if (updatedChild !== child) changed = true;
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

  function replaceNodeId(node, tempId, realId) {
    if (!node) return node;

    if (node.id === tempId) {
      return { ...node, id: realId };
    }

    if (node.children && node.children.length > 0) {
      let changed = false;
      const newChildren = node.children.map((child) => {
        const updatedChild = replaceNodeId(child, tempId, realId);
        if (updatedChild !== child) changed = true;
        return updatedChild;
      });

      if (changed) {
        return { ...node, children: newChildren };
      }
    }

    return node;
  }

  function removeNodeById(node, targetId) {
    if (!node) return node;

    if (node.id === targetId) {
      return null; // remove node
    }

    if (node.children && node.children.length > 0) {
      let changed = false;

      // map + filter to remove all chald nodes
      const newChildren = node.children
        .map((child) => removeNodeById(child, targetId))
        .filter(Boolean); // remove null

      if (newChildren.length !== node.children.length) {
        changed = true;
      }

      // if there is change
      if (changed) {
        return { ...node, children: newChildren };
      }
    }

    return node;
  }

  const submit = async () => {
    if (userData.userStatus !== 1) {
      alert('You are not authorized to comment posts.');
      return;
    }

    let newErrors = validate(content);
    if (Object.keys(newErrors).length !== 0) {
      setErrors(newErrors);
      return;
    }

    // get some temporay id
    const tempId = `temp-${Date.now()}`;

    const newCommentNode = {
      children: [],
      content: content,
      created_on: new Date().toISOString(),
      depth: null,
      downvotes: 0,
      fk_parent_id: parentId,
      id: tempId,
      my_vote: 0,
      score: 0,
      tytle: null,
      upvotes: 0,
      username: username,
    };

    // add node in hte tree
    setTree((prevTree) => addCommentToTree(prevTree, parentId, newCommentNode));

    try {
      let data = {
        title: null,
        content: content,
        userId: userId,
        parentPostId: parentId,
      };
      let newCommentData = await createPost(data);
      log.log('newCommentData: ', newCommentData);

      setTree((prevTree) => replaceNodeId(prevTree, tempId, newCommentData.id));

      setReplying(false);
    } catch (err) {
      log.error('submit: ', err.message, err);
      setTree((prevTree) => removeNodeById(prevTree, tempId));
    }
  };

  const cancel = () => {
    setReplying(false);
  };

  return (
    <div className="comments-creator">
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      {errors.content && <div className="error">{errors.content}</div>}

      <div className="char-counter">
        {content.length} / {MAX_POST_CONTENT_LENGTH}
      </div>

      <div className="comments-creator-buttons">
        <button onClick={submit}>Send</button>
        <button onClick={cancel}>Cancel</button>
      </div>
    </div>
  );
}
