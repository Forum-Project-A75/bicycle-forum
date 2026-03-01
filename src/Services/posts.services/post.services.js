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
      fk_post_status_id: 1,
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
      content: content,
    })
    .eq('id', postId)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function insertPostTags(postID, tagID) {
  const { error } = await supabase.from('post_tags').insert({
    fk_post_id: postID,
    fk_tag_id: tagID,
  });

  if (error) {
    log.error('insertPostTags: ', error.message);
    throw error;
  }
}

export const getUserPostPage = async (from, limit, userId) => {
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
         id,
         title,
         created_on,
        user:users!posts_fk_user_id_fkey (
           uid,
           handle,
           first_name,
           last_name,
           avatar_url
        )
      `,
    )
    .eq('fk_user_id', userId)
    .is('fk_parent_id', null)
    .eq('fk_post_status_id', 1)
    .order('created_on', { ascending: false })
    .range(from, from + limit - 1);

  if (error) {
    log.error('getPostPage: ', error.message);
    throw error;
  }

  log.log('getPostPage returned data: ', data);

  return data.map((p) => ({
    id: p.id,
    title: p.title,
    created_at: p.created_on,
    handle: p.user.handle,
    avatar: p.user.avatar_url,
  }));
};

export const getUserPostPageAdmin = async (from, limit, userId) => {
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
         id,
         title,
         created_on,
         post_status:posts_fk_post_status_id_fkey (
          name
         ),
        user:users!posts_fk_user_id_fkey (
           uid,
           handle,
           first_name,
           last_name,
           avatar_url
        )
      `,
    )
    .eq('fk_user_id', userId)
    .is('fk_parent_id', null)
    .order('created_on', { ascending: false })
    .range(from, from + limit - 1);

  if (error) {
    log.error('getPostPage: ', error.message);
    throw error;
  }

  log.log('getPostPage returned data: ', data);

  return data.map((p) => ({
    id: p.id,
    title: p.title,
    created_at: p.created_on,
    status: p.post_status.name,
    handle: p.user.handle,
    avatar: p.user.avatar_url,
  }));
};

export async function getUserContentPage(userId, type, offset, limit) {
  let query = supabase
    .from('posts')
    .select(
      `
         id,
         title,
         content,
         created_on,
        user:users!posts_fk_user_id_fkey (
           uid,
           handle,
           first_name,
           last_name,
           avatar_url
        )
      `,
    )
    .eq('fk_user_id', userId)
    .order('created_on', { ascending: false })
    .range(offset, offset + limit - 1);

  if (type === 'posts') {
    query = query.is('fk_parent_id', null);
  } else if (type === 'comments') {
    query = query.not('fk_parent_id', 'is', null);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data.map((p) => ({
    id: p.id,
    title: p.title,
    created_at: p.created_on,
    handle: p.user.handle,
    avatar: p.user.avatar_url,
  }));
}

export const getUserCommentPage = async (from, limit, userId) => {
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
         id,
         title,
         content,
         created_on,
        user:users!posts_fk_user_id_fkey (
           uid,
           handle,
           first_name,
           last_name,
           avatar_url
        )
      `,
    )
    .eq('fk_user_id', userId)
    .not('fk_parent_id', 'is', null)
    .order('created_on', { ascending: false })
    .range(from, from + limit - 1);

  if (error) {
    log.error('getPostPage: ', error.message);
    throw error;
  }

  log.log('getPostPage returned data: ', data);

  return data.map((p) => ({
    id: p.id,
    title: p.content,
    created_at: p.created_on,
    handle: p.user.handle,
    avatar: p.user.avatar_url,
  }));
};

export const getPostsFiltereByTag = async (tagId) => {
  const { data: tagRows, error: tagError } = await supabase
    .from('post_tags')
    .select('fk_post_id')
    .eq('fk_tag_id', tagId);

  if (tagError) throw tagError;

  const postIds = tagRows.map((row) => row.fk_post_id);

  if (postIds.length === 0) return [];

  const { data, error } = await supabase
    .from('posts')
    .select(
      `
      id,
      title,
      content,
      created_on,
      user:users!posts_fk_user_id_fkey (
        uid,
        handle,
        first_name,
        last_name,
        avatar_url
      )
    `,
    )
    .in('id', postIds)
    .is('fk_parent_id', null)
    .eq('fk_post_status_id', 1)
    .order('created_on', { ascending: false });

  if (error) throw error;

  return data.map((p) => ({
    id: p.id,
    title: p.content,
    created_at: p.created_on,
    handle: p.user.handle,
    avatar: p.user.avatar_url,
  }));
};

export const getPostPage = async (from, limit) => {
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
         id,
         title,
         created_on,
        user:users!posts_fk_user_id_fkey (
           uid,
           handle,
           first_name,
           last_name,
           avatar_url
        )
      `,
    )
    .is('fk_parent_id', null)
    .eq('fk_post_status_id', 1)
    .order('created_on', { ascending: false })
    .range(from, from + limit - 1);

  if (error) {
    log.error('getPostPage: ', error.message);
    throw error;
  }

  log.log('getPostPage returned data: ', data);

  return data.map((p) => ({
    id: p.id,
    title: p.title,
    created_at: p.created_on,
    handle: p.user.handle,
    avatar: p.user.avatar_url,
  }));
};

export const getPostPageAdmin = async (from, limit) => {
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
         id,
         title,
         created_on,
         post_status:post_statuses!posts_fk_post_status_id_fkey (
          name
         ),
        user:users!posts_fk_user_id_fkey (
           uid,
           handle,
           first_name,
           last_name,
           avatar_url
        )
      `,
    )
    .is('fk_parent_id', null)
    .order('created_on', { ascending: false })
    .range(from, from + limit - 1);

  if (error) {
    log.error('getPostPage: ', error.message);
    throw error;
  }

  log.log('getPostPage returned data: ', data);

  return data.map((p) => ({
    id: p.id,
    title: p.title,
    status: p.post_status.name,
    created_at: p.created_on,
    handle: p.user.handle,
    avatar: p.user.avatar_url,
  }));
};

export const getPostDirectComments = async (pPostID) => {
  const { data, error } = await supabase.rpc('get_post_direct_comments', {
    p_post_id: pPostID,
  });

  if (error) {
    console.log('getPostDirectComments: ', error.message);
    throw new Error(error);
  }

  return data;
};

export const getPostStats = async (postId) => {
  const { data, error } = await supabase.rpc('get_post_stats', {
    p_post_id: postId,
  });

  if (error) {
    throw error;
  }

  return data;
};

export const getCommentsFiltered = async (postID) => {
  const { data, error } = await supabase.rpc('get_post_tree_filtered', {
    p_post_id: postID,
  });

  if (error) {
    console.log('getComments: ', error.message);
    throw new Error(error);
  }

  return data;
};

export const getComments = async (pPostID) => {
  const { data, error } = await supabase.rpc('get_post_thread', {
    p_post_id: pPostID,
  });

  if (error) {
    console.log('getComments: ', error.message);
    throw new Error(error);
  }

  return data;
};

// употребяваме таз функция за да направим дървото от върнатите ни от базата данни записи!
// понеже в тях има дърводина структура, но те се връщат в нещо като рекорд сет т.е. едномерен масив от записи.
export function buildCommentTree(rows) {
  const map = {};
  let root = null;

  // първа инициализация на дръвото!
  rows.forEach((r) => {
    map[r.id] = { ...r, children: [] };
  });

  // тук правим връзката родител дете
  rows.forEach((r) => {
    if (r.fk_parent_id === null) {
      // когато парент е null това значи, че това е главния родителски node
      root = map[r.id];
    } else {
      const parent = map[r.fk_parent_id];
      if (parent) {
        parent.children.push(map[r.id]);
      }
    }
  });

  return root;
}

// нова функция за гласуване! подадените параметри трябва да с voteValue = -1, 0, 1
export async function vote(postId, voteValue) {
  const { data, error } = await supabase.rpc('vote_post', {
    p_post_id: postId,
    p_vote: voteValue,
  });

  if (error) throw error;

  return data;
}

export async function getPostsSumary() {
  const { data, error } = await supabase.rpc('get_root_posts_summary');

  if (error) throw error;

  return data;
}
