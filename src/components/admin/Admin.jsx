import React, { useState, useEffect } from "react";
import Member from "./Member";
import { addUser, fetchAllUser } from "../../apiCaller";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";

const Admin = ({ display }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const intId = parseInt(id);
  const { isLoading: isLoadingMembers, isError: isErrorMembers,
    error: errorMembers, data: dataMembers, refetch: refetchMembers }
    = useQuery(["members", intId], () => fetchAllUser(id))
  const mutationAddUser = useMutation(addUser, {
    onSuccess: () => {
      setNewEmail("");
      refetchMembers()
    }
  })

  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("member");
  const handleSubmit = async (e) => {
    e.preventDefault();
    mutationAddUser.mutate({ email: newEmail, id: intId })

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
            <option value="editor">Editeur</option>
            <option value="guest">Invité</option>
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
      {!isLoadingMembers && !isErrorMembers &&
        <ul className="list">{dataMembers.map((member, index) =>
          <Member key={index} member={member} id={intId} refetchMembers={refetchMembers} />
        )}</ul>
      }
    </div>

  );
};

export default Admin;
