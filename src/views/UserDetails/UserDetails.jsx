import './UserDetails.css';
import moment from 'moment';
import { useState, useEffect } from 'react';

export default function UserDetails({ user, hideDetails, saveChanges }) {
  const [changes, setChanges] = useState({
    status: user.user_statuses.name,
    type: user.user_types.name,
  });

  useEffect(() => {
    document.getElementById('modal-screen').style.display = 'block';
    return () => {
      document.getElementById('modal-screen').style.display = 'none';
    };
  }, []);

  return (
    <dialog className="user-details-modal" open={true}>
      <h2>User Details</h2>
      <div className="info-line">
        <p>Name:</p>
        <p>
          {user.first_name} {user.last_name}
        </p>
      </div>
      <div className="info-line">
        <p>Handle:</p>
        <p>{user.handle}</p>
      </div>
      <div className="info-line">
        <p>Email:</p>
        <p>{user.email}</p>
      </div>
      <div className="info-line">
        <p>Registered on:</p>
        <p>{moment(user.created_on).format('YYYY-MM-DD HH:mm:ss')}</p>
      </div>
      <div id="user-type" className="info-line">
        <p>User Type:</p>
        <div className="admin-search-dropdown">
          <button className="dropbtn">{changes.type}</button>
          <div className="dropdown-content">
            <a
              href="#"
              onClick={() => setChanges({ ...changes, type: 'admin' })}
            >
              Admin
            </a>
            <a
              href="#"
              onClick={() => setChanges({ ...changes, type: 'user' })}
            >
              User
            </a>
          </div>
        </div>
      </div>
      <div id="user-status" className="info-line">
        <p>Status:</p>
        <div className="admin-search-dropdown">
          <button className="dropbtn">{changes.status}</button>
          <div className="dropdown-content">
            <a
              href="#"
              onClick={() => setChanges({ ...changes, status: 'active' })}
            >
              Active
            </a>
            <a
              href="#"
              onClick={() => setChanges({ ...changes, status: 'blocked' })}
            >
              Blocked
            </a>
            <a
              href="#"
              onClick={() => setChanges({ ...changes, status: 'suspended' })}
            >
              Suspended
            </a>
          </div>
        </div>
      </div>
      <div className="info-line">
        <p>UID:</p>
        <p>{user.uid}</p>
      </div>
      <button onClick={() => hideDetails()}>Close</button>
      <button
        onClick={() => {
          saveChanges(changes);
          hideDetails();
        }}
      >
        Save Changes
      </button>
    </dialog>
  );
}
