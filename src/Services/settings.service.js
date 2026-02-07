import { supabase } from "../config/supabase-config";

export const getSettings = async (key) => {
    try {
        const {data, error} = await supabase
                                    .from("settings")
                                    .select('value')
                                    .eq('key', key)
                                    .single();

        if (error) {
            console.log(error);
            throw error;
        }
        
        return data.value;
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}