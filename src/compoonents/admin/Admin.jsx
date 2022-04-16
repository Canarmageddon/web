import React, { useState } from "react";
import Member from "./Member";
const Admin = ({ display }) => {
  const members = [
    { name: "user1", role: "admin" },
    { name: "user2", role: "member" },
    { name: "user3", role: "member" },
  ];

  const listMembers = members.map((member) => {
    return <Member key={member.name} member={member} />
  });
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("member")
  return (
    <div
      style={{
        display: display ? "block" : "none",
        flex: 0.4,
      }}
    >
      <h2 className="main-title">Membre de voyage</h2>
      <form className="admin-form">
        <span className="invite-title">Inviter membre</span>
        <hr />
        <div className="invite-div">
          <input placeholder="email" type="email" className="invite-input" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          <select value={newRole} onChange={(e) => setNewRole(e.target.value)} className="invite-input">
            <option value="admin">Admin</option>
            <option value="member">Membre</option>
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
