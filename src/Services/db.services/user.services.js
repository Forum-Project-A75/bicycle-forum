import { supabase } from '../../config/supabase-config';

export const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email);

  if (error) {
    throw error;
  }

  if (data.length !== 0) {
    return data;
  }

  return null;
};

export const getUserByUid = async (uid) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('uid', uid);

  if (error) {
    throw error;
  }

  if (data.length !== 0) {
    return data;
  }

  return null;
};

export const getUserByHandle = async (handle) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('handle', handle);

  if (error) {
    throw error;
  }

  if (data.length !== 0) {
    return data;
  }

  return null;
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
};

export const registerUser = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
};

export const createUserHandle = async (
  handle,
  id,
  email,
  firstName,
  lastName,
) => {
  const { error } = await supabase.from('users').insert({
    uid: id,
    handle: handle,
    email: email,
    first_name: firstName,
    last_name: lastName,
    fk_user_status_id: 1,
    fk_user_type_id: 2,
  });

  if (error) {
    throw error;
  }
};

export const getUserData = async (uid) => {
  const { data, error } = await supabase
    .from('users')
    .select(
      `
    handle,
    first_name,
    last_name,
    email,
    user_types  (
      name
    )
  `,
    )
    .eq('uid', uid)
    .single();

  if (error) {
    throw error;
  }

  return data;
};
