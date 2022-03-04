import React, { useState } from "react";

const Admin = ({ display }) => {
  const members = [
    { name: "user1", role: "admin" },
    { name: "user2", role: "member" },
    { name: "user3", role: "member" },
  ];

  const listMembers = members.map((member) => {
    const [role, setRole] = useState(member.role);
    const handleRoleChange = (e) => {
      if (e.target.value !== role) {
        setRole(e.target.value);
        console.log("Changing to " + e.target.value);
      }
    };
    return (
      <li key={member.name}>
        {member.name}
        <select value={role} onChange={handleRoleChange} className="list-role">
          <option value="admin">Admin</option>
          <option value="member">Membre</option>
        </select>
        <button className="delete">Supprimer</button>
        <hr className="bar" />
      </li>
    );
  });

  return (
    <div style={{ display: display ? "block" : "none" }}>
      <h2 className="main-title">Membre de voyage</h2>
      <form className="admin-form">
        <span className="invite-title">Inviter membre</span>
        <hr />
        <div className="invite-div">
          <input placeholder="email" type="email" className="invite-input" />
          <select className="invite-input">
            <option value="member">Membre</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="button-new">
            Inviter
          </button>
        </div>
      </form>
      <h3 className="sub-title">Membres</h3>
      <hr className="bar" />
      <span className="nom">Nom</span>
      <span className="role">Role</span>
      <hr className="bar" />
      <ul className="list">{listMembers}</ul>
    </div>
  );
};

export default Admin;
