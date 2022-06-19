import React, { useState, useEffect } from "react";
import Member from "./Member";
import { addUser, fetchAllUser } from "../../apiCaller";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useToken, useUser } from "../../context/userContext";
import { toast } from "react-toastify";

const Admin = ({ display }) => {
  const noEmail = () =>
    toast.warning("Veuilez renseigner l'email de la personne à ajouter");
  const queryClient = useQueryClient();
  const { id } = useParams();
  const intId = parseInt(id);
  const [user] = useUser();
  const [token] = useToken();
  const {
    isLoading: isLoadingMembers,
    isError: isErrorMembers,
    error: errorMembers,
    data: dataMembers,
    refetch: refetchMembers,
  } = useQuery(["members", intId], () => fetchAllUser({ token, id }));
  const mutationAddUser = useMutation(addUser, {
    onSuccess: () => {
      toast.success("l'utilisateur a été ajouté")
      setNewEmail("");
    },
    onError: (error) => {
      //TODO Handle member already in trip
      toast.warning("l'utilisateur n'a pas pu être ajouté")
      console.log(error);
    },
    onSettled: () => queryClient.invalidateQueries(["members", intId])
  });

  const [newEmail, setNewEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newEmail) {
      noEmail();
    }
    mutationAddUser.mutate({ token, email: newEmail, id: intId });
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
          <button type="submit" className="button-new">
            Inviter
          </button>
        </div>
      </form>
      <h3 className="sub-title">Membres</h3>
      <hr className="bar" />
      <span className="nom">Nom</span>
      <hr className="bar" />
      {!isLoadingMembers && !isErrorMembers && (
        <ul className="list">
          {dataMembers.map((member, index) => (
            <Member
              key={index}
              member={member}
              id={intId}
              refetchMembers={refetchMembers}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Admin;
