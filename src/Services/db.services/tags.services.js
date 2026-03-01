import { supabase } from "../../config/supabase-config";
import { createLogger, LOG_MODULES } from "../../debug/debug";


const log = createLogger(LOG_MODULES.TAGS);

export const isTagExist = async (tag) => {
    const { data, error } = await supabase
        .from("tags")
        .select("id")
        .eq("name", tag)
        .maybeSingle();

    if (error) {
        log.log("isTagExist: ", error.message);
        throw error;
    }

    return data !== null;
};

export const insertNewTag = async (tag) => {
    const {  data, error } = await supabase
                                .from("tags")
                                .insert({ name: tag })
                                .select()
                                .single();

    if(error) {
        log.error("insertNewTag: ", error.message);
        throw error;
    }

    return data;
}



export const getOrCreateTag = async (tag) => {

    const { data, error } = await supabase
        .from("tags")
        .upsert(
            { name: tag },
            { onConflict: "name" }   
        )
        .select("id")
        .single();

    if (error) {
        log.error("getOrCreateTag:", error.message);
        throw error;
    }

    return data.id;
};

export const getAllTags = async () => {
    const { data, error } = await supabase
        .from("tags")
        .select("id, name")
        .order("name");

      if (error) throw error;

      return data;

};

export const getTagsByPost = async (postId) => {
    const { data, error } = await supabase
     .rpc("get_tags_by_post", { p_post_id: postId });

    if (error)
        throw error;

    return data;
}

export const buildTagString = (tags, separator) => {
  return tags.reduce((acc, tag, index) => {
    if (index === 0) return `${separator}` + tag.name.toLowerCase();
    return acc + ` ${separator}` + tag.name.toLowerCase();
  }, "");
};
 