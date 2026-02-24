import './UserProfile.css';
import { useAuth } from '../../hoc/auth-context';
import uploadAvatar from '../../Services/db.services/setAvatar';
import { getUserByUid, updateAvatar, updateUserNames } from '../../Services/db.services/user.services.js';
import { getAvatarUrl } from '../../Services/user.services/user.service.js';
import { createLogger, LOG_MODULES } from '../../debug/debug.js';
import { useState, useEffect } from 'react';
import { checkInputUserData } from './validate.data.js';


const log = createLogger(LOG_MODULES.USER_PROFILE);

export default function UserProfile() {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const { user, userData, setUserData } = useAuth();
  const [updatedState, setUpdatedState] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
  });
  const [registrationErrors, setRegistrationErrors] = useState({});
  //const defaultAvatar = '../../../images/default.png';

  const setImage = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5000000) {
      alert('Avatar image size has to be less than 5MB!');
      log.log('Large image size!');
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
        const dbUserData = await getUserByUid(user.id);
        if (dbUserData && dbUserData[0].avatar_url) {
          setDbAvatar(getAvatarUrl(user.id));
        } else {
          setDbAvatar(null);
        }
      } catch (err) {
        log.error('checkImagePath: ', err.message, err);
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
      
      let avatar_url = getAvatarUrl(user.id);
      setPreview(avatar_url);
      updateAvatar(avatar_url);
      alert('Avatar uploaded!');
    } 
    catch (err) {
      log.error('uploadAvatar: ', err.message, err);
      alert('Upload failed');
    }
  };

  const handleSave = async () => {
    const validationErrors = checkInputUserData(updatedState);
    
    if (Object.keys(validationErrors).length !== 0) {
      setRegistrationErrors(validationErrors);
      return;
    }

    try {
      await updateUserNames(updatedState.firstName, updatedState.lastName);
    }
    catch (err) {
      log.error(err);
      return;
    }

    setUserData({...userData, firstName: updatedState.firstName, lastName: updatedState.lastName });
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
      <div id="edit-section">
        <div className="field" id="avatar-field">
          <img src={preview || dbAvatar} alt="avatar" />
          <div>
            <input type="file" accept="image/*" onChange={setImage} />
            <button onClick={handleUpload} disabled={!avatar}>
              Upload
            </button>
          </div>
        </div>
        <div id="names">
          <div className="email">
            <label htmlFor="Email">Email: </label>
            <div className="input-layout">
              <input
                value={userData && userData.email || ''}
                type="text"
                readOnly
              />
            </div>
          </div>
          <div className="handle">
            <label htmlFor="Handle">User name: </label>
            <div className="input-layout">
              <input
                value={userData && userData.handle || ''}
                type="text"
                readOnly
              />
            </div>
          </div>
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
              {registrationErrors.firstName && (
              <p className="error">{registrationErrors.firstName}</p>
               )}
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
              {registrationErrors.lastName && (
              <p className="error">{registrationErrors.lastName}</p>
               )}
            </div>
          </div>
          <button onClick={handleSave}>
              Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

//{preview || dbAvatar || defaultAvatar && (<img src={preview || dbAvatar || defaultAvatar} alt="avatar" style={{width: "150px", height: "150px", borderRadius: "50%"}}/>)}
//<div>Profile Welcome:</div>

//<img src={preview || dbAvatar || defaultAvatar} alt="avatar" />
