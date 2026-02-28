import './UserSearchNode.css';

export default function UserSearchNode({ user, showDetails }) {
  return (
    <div className="user-search-node">
      <button onClick={() => showDetails(user)}>{user.handle}</button>
    </div>
  );
}
