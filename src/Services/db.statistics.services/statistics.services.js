import { supabase } from "../../config/supabase-config";


// returned data
// [
//   {
//     users_count: 42,
//     posts_count: 128
//   }
// ]
export const getStatistics = async () => {
    const  { data, error } = await supabase
                                   .from('forum_stats')
                                   .select('*');

    if(error) {
        console.log(error.message);
        throw new Error(error);
    }

    console.log(data);
    return data;
}