import { useState, useEffect } from "react";
import { searchUsersByHandle } from "../../Services/db.services/user.services";
import "./UserCombo.css";

export default function UserCombobox({ value, onChange, placeholder = "Search user..." }) {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  // sync query with selected value
  useEffect(() => {
    if (value) {
      setQuery(value.handle);
    } else {
      setQuery("");
    }
  }, [value]);

  // debounce search
  useEffect(() => {
    if (query.length < 2) {
      setUsers([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await searchUsersByHandle(query);
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (user) => {
    onChange(user);
    setQuery(user.handle);
    setShowDropdown(false);
  };

  const handleClear = () => {
    onChange(null);   // казваме на родителя, че няма избран потребител
    setQuery("");     // изчистваме input-а
    setUsers([]);
  };

  return (
    <div className="combobox">
      <input
        type="text"
        value={query}
        placeholder={placeholder}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(null); // премахваме избора, докато пише
        }}
        onFocus={() => setShowDropdown(true)}
      />

      {query && (
        <button className="clear-btn" onClick={handleClear}>
          ✕
        </button>
      )}

      {showDropdown && query.length >= 2 && (
        <div className="dropdown">
          {loading && <div className="dropdown-item">Loading...</div>}

          {!loading && users.length === 0 && <div className="dropdown-item">No results</div>}

          {!loading && users.map((user) => (
            <div
              key={user.uid}
              className="dropdown-item"
              onClick={() => handleSelect(user)}
            >
              {user.handle}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}