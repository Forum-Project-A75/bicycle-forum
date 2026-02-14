import { supabase } from "../../config/supabase-config";

export default async function uploadAvatar (userid, file)   {
    if(!file || !userid) throw new Error("Invalid file");

    //const fileExt = file.name.split('.').pop();
  //const fileName = `${userid}.${fileExt}`;
  const filePath = `${userid}/avatar.png`;

  // upload
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, { upsert: true, cacheControl: '0' });

    //if (uploadError) throw uploadError;
  if (uploadError) {
    console.error("UPLOAD ERROR:", uploadError.message);
    throw uploadError;
  }

  // взимаме public URL
  // const { data } = supabase.storage
  //   .from('avatars')
  //   .getPublicUrl(filePath);


  //   return data?.publicUrl ?? null;
  // // записваме в users таблицата
  // const { error: dbError } = await supabase
  //   .from('users')
  //   .update({ avatar_url: publicUrl })
  //   .eq('id', userid);

  //   //if (dbError) throw dbError;
  //   if (dbError) {
  //     console.error(dbError.message);
  //     return;
  //   }
} 