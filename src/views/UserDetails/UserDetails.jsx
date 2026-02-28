import './UserDetails.css';
import moment from 'moment';
import { useState } from 'react';

export default function UserDetails({ user, hideDetails, saveChanges }) {
  const [changes, setChanges] = useState({
    status: user.user_statuses.name,
    type: user.user_types.name,
  });

  return (
    <dialog className="user-details-modal" open={true}>
      <h2>User Details</h2>
      <p>
        Name: {user.first_name} {user.last_name}
      </p>
      <p>Handle: {user.handle}</p>
      <p>Email: {user.email}</p>
      <p>
        Registered on: {moment(user.created_on).format('YYYY-MM-DD HH:mm:ss')}
      </p>
      <div id="user-type">
        <p>User Type: {changes.type}</p>
        <div className="admin-search-dropdown">
          <button className="dropbtn">Change Type</button>
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
      <div id="user-status">
        <p>Status: {changes.status}</p>
        <div className="admin-search-dropdown">
          <button className="dropbtn">Change Status</button>
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
      <p>UID: {user.uid}</p>
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
