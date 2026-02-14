import './UserProfile.css';
import { useAuth } from '../../hoc/auth-context';
import uploadAvatar from '../../Services/db.services/setAvatar';
import {getAvatarUrl} from '../../Services/user.services/user.service.js'



import {useState,useEffect } from "react";




export default function UserProfile() {

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null); 
  const { user } = useAuth();
  const defaultAvatar = "../../../images/default.png";
  //const defaultAvatar = null;

  const setImage = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5000000) {
      alert("Avatar image size has to be less than 5MB!");
      return;
    }

    setAvatar(file);

    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
  };

  const [dbAvatar, setDbAvatar] = useState(null);

useEffect(() => {
   if (user?.id) {
    setDbAvatar(getAvatarUrl(user.id));
  }
}, [user]);

  const handleUpload = async () => {
    if (!avatar) {
      alert("Please select image first");
      return;
    }

    try {
      await uploadAvatar(user.id, avatar);
      setPreview(getAvatarUrl(user.id));
      alert("Avatar uploaded!");
    } catch (err) {
      console.error(err.message);
      alert("Upload failed");
    }
  };


  

  return (
    <>
    <div id="user_profile">
      <img src={preview || dbAvatar || defaultAvatar} alt="avatar" style={{width: "150px", height: "150px", borderRadius: "50%"}}/>
      <input type="file" accept="image/*" onChange={setImage} />
      <button onClick={handleUpload} disabled={!avatar}>Upload</button>
    </div>

    </>
    
  );
}

//{preview || dbAvatar || defaultAvatar && (<img src={preview || dbAvatar || defaultAvatar} alt="avatar" style={{width: "150px", height: "150px", borderRadius: "50%"}}/>)}
//<div>Profile Welcome:</div>