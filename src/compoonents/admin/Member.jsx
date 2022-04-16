import { useState } from "react";
export default function Member({ member }) {
    const [role, setRole] = useState(null);
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
        <button className="delete">Supprimer</button>
        <hr className="bar" />
    </li>
} 