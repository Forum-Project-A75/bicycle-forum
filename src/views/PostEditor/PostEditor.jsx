import { useEffect, useState } from 'react';
import { useAuth } from '../../hoc/auth-context';
import { createPost, getPostForEdit, updatePost } from '../../Services/posts.services/post.services.js';
import './PostEditor.css';
import { createLogger, LOG_MODULES } from '../../debug/debug';
import { getOrCreateTag } from '../../Services/db.services/tags.services.js';
import { insertPostTags } from '../../Services/posts.services/post.services.js';
import { validate, MAX_POST_TITLE_LENGTH, MAX_POST_CONTENT_LENGTH } from './validate.data.js';

const log = createLogger(LOG_MODULES.POST_EDITOR);

export default function PostEditor({ parentPostId = null, postId = null, onSave }) {



  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState('');

  const isEditMode = postId !== null;
  log.log("isEditMode: ", isEditMode);

  useEffect(() => {

    if (!isEditMode) return;

    const load = async () => {
      try {
        const post = await getPostForEdit(postId);

        setTitle(post.title ?? '');
        setContent(post.content ?? '');

      } catch (err) {
        alert("Cannot load post for editing");
        log.error("Cannot load post for editing: ", err.message, err);
      }
    };

    load();

  }, [postId, isEditMode]);


  


  const handleSave = async () => {

    let data = { title: title, content: content };

    let newErrors = validate(data);
    if (Object.keys(newErrors).length !== 0) {
      setErrors(newErrors);
      return;
    } 

    setLoading(true);

    try {
      let result;
      if (isEditMode) {
        result = await updatePost({
          postId,
          title,
          content
        });
      } 
      else {
        result = await createPost({
          title,
          content,
          userId: user.id,
          parentPostId
        });

        let tagData = tags;
        tagData = tagData.trim();
        tagData = tagData.split(/[ ,#;]+/);
        for (let tag of tagData) {
           tag = tag.trim();
           if(tag.length === 0) continue; // do not process empty tags
           tag = tag.toUpperCase(); // all tags will be with upercase 
           const tagId = await getOrCreateTag(tag);
           insertPostTags(result.id, tagId);
        }
      }

      if (onSave) onSave(result);
    } 
    catch (err) {
      log.error("handleSave: ", err);
      alert(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="post-editor">

      <h2>{isEditMode ? "Edit Post" : "Create Post"}</h2>

      {/* TITLE */}
      <div className="editor-field">
        <label>Title</label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="char-counter">
          {title.length} / {MAX_POST_TITLE_LENGTH}
        </div>

        {errors.title && <div className="error">{errors.title}</div>}
      </div>

      {/* TAGS */}
      <div className="editor-field">
        <label>Tags</label>

        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        
      </div>


      {/* CONTENT */}
      <div className="editor-field">
        <label>Content</label>

        <textarea
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="char-counter">
          {content.length} / {MAX_POST_CONTENT_LENGTH}
        </div>

        {errors.content && <div className="error">{errors.content}</div>}
      </div>


      {/* BUTTONS */}
      <div className="editor-buttons">

        <button
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : (isEditMode ? "Save Changes" : "Create")}
        </button>

      </div>

    </div>
  );
}



//<div className="char-counter">
//          {tags.length} / 120
//        </div>
//        {errors.tags && <div className="tags">{errors.tags}</div>}