import './UserProfile.css';
import { useAuth } from '../../hoc/auth-context';
import uploadAvatar from '../../Services/db.services/setAvatar';
import { getUserByUid } from '../../Services/db.services/user.services.js';
import { getAvatarUrl } from '../../Services/user.services/user.service.js';
import { createLogger, LOG_MODULES } from '../../debug/debug.js';
import { useState, useEffect } from 'react';

const log = createLogger(LOG_MODULES.USER_PROFILE);

export default function UserProfile() {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const { user, userData } = useAuth();
  const [updatedState, setUpdatedState] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
  });
  const defaultAvatar = '../../../images/default.png';

  const setImage = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5000000) {
      alert('Avatar image size has to be less than 5MB!');
      log.log("Large image size!");
      return;
    }

    setAvatar(file);

    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
  };

  const [dbAvatar, setDbAvatar] = useState(null);

  useEffect(() => {
    async function checkImagePath() {
      try {
        const userData = await getUserByUid(user.id);
        if (userData && userData[0].avatar_url) {
          setDbAvatar(getAvatarUrl(user.id));
        } else {
          setDbAvatar(null);
        }
      } catch (err) {
        log.err("checkImagePath: ", err.message, err);
      }
    }
    checkImagePath();
  }, [user]);

  const handleUpload = async () => {
    if (!avatar) {
      alert('Please select image first');
      return;
    }

    try {
      await uploadAvatar(user.id, avatar);
      setPreview(getAvatarUrl(user.id));
      alert('Avatar uploaded!');
    } catch (err) {
      log.err("uploadAvatar: ", err.message, err);
      alert('Upload failed');
    }
  };

  const updateNames = (prop) => (e) => {
    setUpdatedState({
      ...updatedState,
      [prop]: e.target.value,
    });
  };

  return (
    <div id="user-profile">
      <p>Edit Details</p>
      <hr />
      <div id="fields">
        <div className="field" id="avatar-field">
          <img src={preview || dbAvatar || defaultAvatar} alt="avatar" />
          <div>
            <input type="file" accept="image/*" onChange={setImage} />
            <button onClick={handleUpload} disabled={!avatar}>
              Upload
            </button>
          </div>
        </div>
        <div id="names">
          <div className="field">
            <label htmlFor="First Name">First Name: </label>
            <div className="input-layout">
              <input
                value={(updatedState && updatedState.firstName) || ''}
                onChange={updateNames('firstName')}
                type="text"
                placeholder="Enter First Name"
                id="firstName"
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="Last Name">Last Name: </label>
            <div className="input-layout">
              <input
                value={(updatedState && updatedState.lastName) || ''}
                onChange={updateNames('lastName')}
                type="text"
                placeholder="Enter Last Name"
                id="lastName"
              />
            </div>
          </div>
          <button>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

//{preview || dbAvatar || defaultAvatar && (<img src={preview || dbAvatar || defaultAvatar} alt="avatar" style={{width: "150px", height: "150px", borderRadius: "50%"}}/>)}
//<div>Profile Welcome:</div>
