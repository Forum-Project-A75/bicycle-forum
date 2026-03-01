export const user_statuses = Object.freeze({
  active: 1,
  blocked: 2,
  suspended: 3,
});

export const user_types = Object.freeze({
  admin: 1,
  user: 2,
});

export const post_statuses = Object.freeze({
  1: 'visible',
  2: 'hidden',
  3: 'deleted',
  4: 'blocked',
});

export const MIN_NAME_LENGTH = 4;
export const MAX_NAME_LENGTH = 32;
export const MIN_PASSWORD_LENGTH = 8;

export const PAGE_SIZE = 10;
export const HOME_GET_LATEST_POSTS_COUNT = 5;
export const HOME_GET_MOST_COMMENTED_POSTS_COUNT = 5;

export const MIN_POST_TITLE_LENGTH = 16;
export const MAX_POST_TITLE_LENGTH = 64;
export const MIN_POST_CONTENT_LENGTH = 32;
export const MAX_POST_CONTENT_LENGTH = 8192;

export const DEFAULT_TAG_SEPARATOR = '#';
