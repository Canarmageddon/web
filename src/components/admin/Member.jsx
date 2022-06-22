import { useState, useEffect } from "react";
import { removeUser, whoAmI } from "../../apiCaller";
import { useMutation, useQueryClient } from "react-query";
import { useToken } from "../../context/userContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function Member({ member, id, refetchMembers }) {
  const { t } = useTranslation("translation");
  const queryClient = useQueryClient();
  const [role, setRole] = useState(member.role);
  const [token] = useToken();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  useEffect(async () => {
    const whoami = await whoAmI(window.localStorage.getItem("token"))
    setEmail(whoami.email)

  }, [])
  const mutationRemoveUser = useMutation(removeUser, {
    onMutate: (data) => {
      if (data.email == email) navigate('/');
      return data
    },
    onSuccess: (data) => {
      if (data.email == email) {
        toast.success("Vous avez quitté le groupe")
      }
      else {
        toast.success("utilisateur supprimé")
      }
    },
    onError: () => toast.warning("l'utilisateur n'a pas pu être modifié"),
    onSettled: () => refetchMembers(),
  });
  const handleRoleChange = (e) => {
    if (e.target.value !== role) {
      setRole(e.target.value);
    }
  };
  const handleClick = async (email, name) => {
    mutationRemoveUser.mutate({ token, email, name, id });
  };
  return (
    <li key={member.user.id}>
      {member.user.firstName ? member.user.firstName : member.user.name} {member.user.lastName}
      {member.user.tripUsers && member.user.tripUsers[0].role}
      {/*  <select value={role} onChange={handleRoleChange} className="list-role">
            <option value="editor">Editeur</option>
            <option value="guest">Invité</option>
        </select> */}
      <button className="delete" onClick={() => handleClick(member.user.email, member.user.name)}>
        {t("delete")}
      </button>
      <hr className="bar" />
    </li>
  );
}
