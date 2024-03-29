import React, { useState, useEffect } from "react";
import Member from "./Member";
import { addUser, fetchAllUser, getLink } from "../../apiCaller";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useToken, useUser } from "../../context/userContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import "./admin.css";
import { FormControl } from "react-bootstrap";
import { generateLink } from "../../Functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

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
      toast.success(t("admin.added_user"));
      setNewEmail("");
      setLastname("");
    },
    onError: (error) => {
      toast.warning(t("admin.not_added_user"));
    },
    onSettled: () => queryClient.invalidateQueries(["members", intId]),
  });
  const mutationAddUserNoAccount = useMutation(addUser, {
    onSuccess: () => {
      toast.success(t("admin.added_user"));
      setLastname("");
      setfirstname("");
    },
    onError: (error) => {
      toast.warning(t("admin.not_added_user"));
    },
    onSettled: () => queryClient.invalidateQueries(["members", intId]),
  });
  const { data: dataLink } = useQuery(["link", id], () => getLink(id));
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
    mutationAddUser.mutate({ token, name: lastname, id: intId });
  };
  return (
    <div
      style={{
        display: display ? "block" : "none",
        marginLeft: 30,
        marginRight: 30,
        flex: 1,
      }}
    >
      <div className="title-link-container">
        <h2 className="main-title">{t("admin.trips_members")}</h2>
        <div className="link-container">
          {t("link_share")} :{" "}
          <a
            target="_blank"
            href={"http://" + generateLink(id, dataLink?.link)}
          >
            {generateLink(id, dataLink?.link)}
          </a>
          <FontAwesomeIcon
            icon={faPaperclip}
            className="paper-clip-icon"
            onClick={
              () =>
                navigator.clipboard.writeText(generateLink(id, dataLink?.link)) //TODO
            }
          />
        </div>
      </div>
      <form className="admin-form" onSubmit={(e) => handleSubmit(e)}>
        <span className="invite-title ">{t("admin.add_member")}</span>
        <hr className="blue-hr" />
        <div className="invite-div">
          <FormControl
            placeholder="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            type="email"
          />
          <button type="submit" className="button-new">
            {t("admin.invite")}
          </button>
        </div>
      </form>
      <form className="admin-form" onSubmit={(e) => handleSubmitNoAccount(e)}>
        <span className="invite-title">{t("admin.add_no_account")}</span>
        <hr className="blue-hr" />
        <div className="invite-div">
          <FormControl
            placeholder={t("create_account.last_name")}
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            type="text"
          />
          <button type="submit" className="button-new">
            {t("admin.invite")}
          </button>
        </div>
      </form>
      <h3 className="sub-title">{t("admin.members")} </h3>
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
