//import { supabase } from "../../config/supabase-config";
import { useState } from "react";
import { validate } from './validate.data.js';
import { MAX_POST_CONTENT_LENGTH } from "../../views/PostEditor/validate.data.js";
import { createPost } from "../../Services/posts.services/post.services.js";
import { createLogger, LOG_MODULES } from "../../debug/debug.js";

const log = createLogger(LOG_MODULES.CREATE_COMMENT);

export default function CommentsCreator({ userId, parentId, setReplying }) {

  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});

  log.log("incomming data: ", userId, parentId);

  const submit = async () => {

    let newErrors = validate(content);
      if (Object.keys(newErrors).length !== 0) {
        setErrors(newErrors);
        return;
      }

      let data = {title: null, content: content, userId: userId, parentPostId: parentId};

      await createPost(data);

      setReplying(false);
  };

  const cancel = () => {
    setReplying(false);
  }

  

  return (
    <div>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      {errors.content && <div className="error">{errors.content}</div>}

      <div className="char-counter">
        {content.length} / {MAX_POST_CONTENT_LENGTH}
      </div>

      <button onClick={submit}>Send</button>
      <button onClick={cancel}>Cancel</button>
    </div>
  );
}