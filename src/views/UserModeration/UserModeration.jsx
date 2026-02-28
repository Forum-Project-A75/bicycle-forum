import './UserModeration.css';
import {
  searchUsers,
  getUserByEmail,
} from '../../Services/db.services/user.services.js';
import { useState } from 'react';
import UserSearchNode from '../UserSearchNode/UserSearchNode.jsx';
import UserDetails from '../UserDetails/UserDetails.jsx';
import {
  updateUserStatus,
  updateUserType,
} from '../../Services/db.services/user.services';
import { user_statuses, user_types } from '../../constants';

export default function UserModeration() {
  const [error, setError] = useState(null);
  const [handle, setHandle] = useState('');
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    if (handle.length < 3) {
      setError('Please enter at least 3 characters to search.');
      return;
    }

    const isEmail =
      handle.match(/^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/gm)?.length > 0;

    if (isEmail) {
      try {
        const userData = await getUserByEmail(handle);
        setUsers(userData ? userData : []);
        setError(null);
      } catch (error) {
        console.error('Error fetching user by email:', error);
      }
    } else {
      try {
        const usersData = await searchUsers(handle);
        setUsers(usersData);
        setError(null);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
  };

  const handleSearchChange = (e) => {
    if (e.key === 'Enter') {
      fetchUsers();
      return;
    }
    const handle = e.target.value;
    setHandle(handle.trim());
  };

  const saveChanges = async (uid, changes) => {
    if (changes.status !== selectedUser.user_statuses.name) {
      await updateUserStatus(uid, user_statuses[changes.status]);
    }
    if (changes.type !== selectedUser.user_types.name) {
      await updateUserType(uid, user_types[changes.type]);
    }
  };

  return (
    <div className="user-moderation">
      <p>User Moderation Page</p>
      <div id="search-bar">
        <input
          type="search"
          name="search"
          id="search-input"
          placeholder="Search users..."
          onChange={handleSearchChange}
          onKeyDown={handleSearchChange}
        />
        <button onClick={fetchUsers}>Search</button>
      </div>
      <div id="search-results">
        {error && <p className="error">{error}</p>}
        {(users?.length > 0 && (
          <div id="users-list">
            {users.map((user) => (
              <UserSearchNode
                key={`user-${user.handle}`}
                user={user}
                showDetails={setSelectedUser}
              />
            ))}
          </div>
        )) ||
          (users?.length === 0 && <p>No users found.</p>)}
        {users === null && <p>Search for users by handle or email.</p>}
      </div>
      {selectedUser && (
        <UserDetails
          user={selectedUser}
          hideDetails={() => setSelectedUser(null)}
          saveChanges={(changes) => saveChanges(selectedUser.uid, changes)}
        />
      )}
    </div>
  );
}
