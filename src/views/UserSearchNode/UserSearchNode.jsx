import './UserSearchNode.css';

export default function UserSearchNode({ user, showDetails }) {
  return (
    <div className="user-search-node">
      <p>{user.handle}</p>
      <button onClick={() => showDetails(user)}>View Details</button>
    </div>
  );
}
