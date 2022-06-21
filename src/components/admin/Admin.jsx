import React, { useState, useEffect } from "react";
import Member from "./Member";
import { addUser, fetchAllUser } from "../../apiCaller";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useToken, useUser } from "../../context/userContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Admin = ({ display }) => {
  const { t } = useTranslation("translation");
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
      toast.success(t("admin.added_user"))
      setNewEmail("");
    },
    onError: (error) => {
      //TODO Handle member already in trip
      toast.warning(t("admin.not_added_user"))
      console.log(error);
    },
    onSettled: () => queryClient.invalidateQueries(["members", intId])
  });
  const mutationAddUserNoAccount = useMutation(addUser, {
    onSuccess: () => {
      toast.success(t("admin.added_user"))
      setLastname("");
      setfirstname("");
    }, onError: (error) => {
      //TODO Handle member already in trip
      toast.warning(t("admin.not_added_user"))
      console.log(error);
    },
    onSettled: () => queryClient.invalidateQueries(["members", intId])

  })
  const [firstname, setfirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newEmail) {
      noEmail();
    }
    mutationAddUser.mutate({ token, email: newEmail, id: intId });
  };
  const handleSubmitNoAccount = (e) => {
    e.preventDefault();

  }
  return (
    <div
      style={{
        display: display ? "block" : "none",
        flex: 1,
      }}
    >
      <h2 className="main-title">{t("admin.trips_members")}</h2>
      <form className="admin-form" onSubmit={(e) => handleSubmit(e)}>
        <span className="invite-title">{t("admin.add_member")}</span>
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
      <form className="admin-form" onSubmit={(e) => handleSubmitNoAccount(e)}>
        <span className="invite-title">{t("admin.add_no_account")}</span>
        <hr />
        <div className="invite-div">
          <input
            placeholder={t("create_account.first_name")}
            type="text"
            className="invite-input"
            value={firstname}
            onChange={(e) => setfirstname(e.target.value)}
          />
          <input
            placeholder={t("create_account.last_name")}
            type="text"
            className="invite-input"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <button type="submit" className="button-new">
            Inviter
          </button>
        </div>
      </form>
      <h3 className="sub-title">{t("admin.members")} </h3>
      <hr className="bar" />
      <span className="nom">{t("trip_list.name")}</span>
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
