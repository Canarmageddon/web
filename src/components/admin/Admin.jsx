import React, { useState } from "react";
import Member from "./Member";
import { addUser } from "../../apiCaller";
import { useParams } from "react-router-dom";

const Admin = ({ display }) => {
  const { id } = useParams();

  const [members, setMembers] = useState([
    { name: "user1", role: "admin" },
    { name: "user2", role: "member" },
    { name: "user3", role: "member" },
  ]);

  const listMembers = members.map((member) => {
    return <Member key={member.name} member={member} />;
  });
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("member");
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newMember = await addUser(newEmail, id);
    setMembers([
      ...members,
      {
        name: `${newMember.lastName} ${newMember.firstName}`,
        role: newRole,
      },
    ]);
    setNewEmail("");
  };
  return (
    <div
      style={{
        display: display ? "block" : "none",
        flex: 1,
      }}
    >
      <h2 className="main-title">Membre de voyage</h2>
      <form className="admin-form" onSubmit={(e) => handleSubmit(e)}>
        <span className="invite-title">Inviter membre</span>
        <hr />
        <div className="invite-div">
          <input
            placeholder="email"
            type="email"
            className="invite-input"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="invite-input"
          >
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
