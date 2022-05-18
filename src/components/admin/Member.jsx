import { useState } from "react";
import { deleteUser, fetchAllUser, removeUser } from "../../apiCaller";
export default function Member({ member, setMembers, id }) {
    const [role, setRole] = useState(member.role);
    const handleRoleChange = (e) => {
        if (e.target.value !== role) {
            setRole(e.target.value);
        }
    };
    const handleClick = async (email) => {
        await removeUser(email, id);
        setMembers(await fetchAllUser(id))
    }
    return <li key={member.user.name}>
        {member.user.firstName} {member.user.lastName}
        "                 "
        {member.user.tripUsers && member.user.tripUsers[0].role}
        {/*  <select value={role} onChange={handleRoleChange} className="list-role">
            <option value="editor">Editeur</option>
            <option value="guest">Invité</option>
        </select> */}
        <button className="delete" onClick={() => handleClick(member.user.email)}>Supprimer</button>
        <hr className="bar" />
    </li>
} 