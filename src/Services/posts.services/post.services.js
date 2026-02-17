import { supabase } from '../../config/supabase-config';
import { createLogger, LOG_MODULES } from '../../debug/debug';


const log = createLogger(LOG_MODULES.POST_EDITOR);


export async function createPost({ title, content, userId, parentPostId }) {

  const { data, error } = await supabase
    .from('posts')
    .insert({
      title: title,
      content: content,
      fk_user_id: userId,
      fk_parent_id: parentPostId,
      fk_post_status_id: 1   
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}


export async function getPostForEdit(postId) {

  const { data, error } = await supabase
    .from('posts')
    .select('id, title, content, fk_user_id')
    .eq('id', postId)
    .single();

  if (error) throw error;

  return data;
}


export async function updatePost({ postId, title, content }) {

  const { data, error } = await supabase
    .from('posts')
    .update({
      title: title,
      content: content
    })
    .eq('id', postId)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function insertPostTags(postID, tagID) {
  const {error}  = await supabase
                   .from("post_tags")
                   .insert({
                             fk_post_id: postID,
                             fk_tag_id: tagID
                           });

  if(error) {
    log.error("insertPostTags: ", error.message);
    throw error;
  }
}