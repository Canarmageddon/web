import { useState } from "react";
import { deleteUser, fetchAllUser, removeUser } from "../../apiCaller";
import { useQuery, useMutation, useQueryClient } from "react-query";
export default function Member({ member, id, refetchMembers }) {
    const queryClient = useQueryClient()
    const [role, setRole] = useState(member.role);
    const mutationRemoveUser = useMutation(removeUser, {
        onSuccess: () => refetchMembers()

    })
    const handleRoleChange = (e) => {
        if (e.target.value !== role) {
            setRole(e.target.value);
        }
    };
    const handleClick = async (email) => {
        mutationRemoveUser.mutate({ email, id })
    }
    return <li key={member.user.name}>
        {member.user.firstName} {member.user.lastName}
        {member.user.tripUsers && member.user.tripUsers[0].role}
        {/*  <select value={role} onChange={handleRoleChange} className="list-role">
            <option value="editor">Editeur</option>
            <option value="guest">Invité</option>
        </select> */}
        <button className="delete" onClick={() => handleClick(member.user.email)}>Supprimer</button>
        <hr className="bar" />
    </li>
} 