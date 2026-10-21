import { useEffect, useMemo, useRef, useState } from "react";

function UserTable({ users, onEdit, onDelete }) {
  const [search,setSearch]=useState("");
  const searchref=useRef(null)

  useEffect(()=>{
     searchref.current.focus()
  },[])
  const filteredusers=useMemo(()=>{
    return users.filter((u)=>u.name.toLowerCase().includes(search.toLowerCase()))
  },[users,search])
  return (
    <>
    <div className="toolbar">
      <h2 className="toolbar-title">Users</h2>

      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
        ref={searchref}
          className="search-input"
          placeholder="Search by name..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
        {search && (
          <button className="search-clear" onClick={()=>setSearch("")} aria-label="Clear search">✕</button>
        )}
      </div>
    </div>

     <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Phone</th>
          <th>City</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredusers.length === 0 ? (
          <tr>
            <td colSpan="7" className="empty">
              {search ? `No users match "${search}"` : "No users yet"}
            </td>
          </tr>
        ) : (
          filteredusers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.phone}</td>
              <td>{user.city}</td>
              <td>
                <button className="btn edit" onClick={() => onEdit(user)}>Edit</button>
                <button className="btn delete" onClick={() => onDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
    </>
   
  );
}

export default UserTable;
