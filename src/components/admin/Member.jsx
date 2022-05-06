import { useState } from "react";
import { deleteUser } from "../../apiCaller";
export default function Member({ member }) {
    const [role, setRole] = useState(member.role);
    const handleRoleChange = (e) => {
        if (e.target.value !== role) {
            setRole(e.target.value);
        }
    };
    return <li key={member.name}>
        {member.name}
        <select value={role} onChange={handleRoleChange} className="list-role">
            <option value="admin">Admin</option>
            <option value="member">Membre</option>
        </select>
        <button className="delete" onClick={() => deleteUser(member.email)}>Supprimer</button>
        <hr className="bar" />
    </li>
} 