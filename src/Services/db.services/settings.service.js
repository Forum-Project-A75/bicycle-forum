import { supabase } from "../../config/supabase-config";
import { createLogger, LOG_MODULES } from "../../debug/debug";

const log = createLogger(LOG_MODULES.DB);

export const getSettings = async (key) => {
    try {
        const {data, error} = await supabase
                                    .from("settings")
                                    .select('value')
                                    .eq('key', key)
                                    .single();

        if (error) {
            log.error("getSettings(): ", error.message, error);
            throw error;
        }
        
        return data.value;
    }
    catch(error) {
        log.error("getSettings(): ", error.message, error);
        throw error;
    }
}