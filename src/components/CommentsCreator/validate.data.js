import {MIN_POST_CONTENT_LENGTH, MAX_POST_CONTENT_LENGTH} from'../../views/PostEditor/validate.data.js';

export const validate = (content) => {

    let errors = {};

    if (content.length < MIN_POST_CONTENT_LENGTH)
      errors.content = `Content too short must be at least ${MIN_POST_CONTENT_LENGTH}`;

    if (content.length > MAX_POST_CONTENT_LENGTH)
      errors.content = `Content too long (max ${MAX_POST_CONTENT_LENGTH})`;

    return errors;
};