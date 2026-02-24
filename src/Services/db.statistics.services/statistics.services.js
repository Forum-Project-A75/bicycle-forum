import { supabase } from '../../config/supabase-config';

// returned data
// [
//   {
//     users_count: 42,
//     posts_count: 128
//   }
// ]
export const getStatistics = async () => {
  const { data, error } = await supabase.from('forum_stats').select('*');

  if (error) {
    console.log(error.message);
    throw new Error(error);
  }

  return data;
};

export const getLatestPosts = async (count) => {
  
  
  
  //const { data, error } = await supabase.rpc('get_latest_posts', {
  const { data, error } = await supabase.rpc('get_latest_threads', {
    p_limit: count,
  });

  if (error) {
    console.log(error.message);
    throw new Error(error);
  }

  return data;
};

export const getMostCommentedPosts = async (count) => {
  
  //const { data, error } = await supabase.rpc('get_most_commented_posts', {
  const { data, error } = await supabase.rpc('get_most_commented_threads', {
    p_limit: count,
  });

  if (error) {
    console.log(error.message);
    throw new Error(error);
  }

  return data;
};
