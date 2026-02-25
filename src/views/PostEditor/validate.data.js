import { MIN_POST_TITLE_LENGTH, MAX_POST_TITLE_LENGTH, MIN_POST_CONTENT_LENGTH, MAX_POST_CONTENT_LENGTH } from "../../constants";

export const validate = (data) => {

    let errors = {};

    if (data.title.length < MIN_POST_TITLE_LENGTH)
      errors.title = `Title must be at least ${MIN_POST_TITLE_LENGTH} characters`;

    if (data.title.length > MAX_POST_TITLE_LENGTH)
      errors.title = `Title too long (max ${MAX_POST_TITLE_LENGTH})`;

    if (data.content.length < MIN_POST_CONTENT_LENGTH)
      errors.content = `Content too short must be at least ${MIN_POST_CONTENT_LENGTH}`;

    if (data.content.length > MAX_POST_CONTENT_LENGTH)
      errors.content = `Content too long (max ${MAX_POST_CONTENT_LENGTH})`;

    return errors;
};