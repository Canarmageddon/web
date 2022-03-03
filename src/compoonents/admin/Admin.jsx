import React, {useState} from "react";



const Admin = () => {
    const members = [{name: 'user1', role: 'admin'}, {name: 'user2', role: 'member'}, {name: 'user3', role: 'member'}];
    
    const listMembers = members.map((member) => {
        const [role, setRole] = useState(member.role);
        const handleRoleChange = (e) => {
            if(e.target.value !== role){
                setRole(e.target.value);
                console.log("Changing to " + e.target.value);
            }
        }
        return(
            <li key={member.name}>
                {member.name}
                <select value={role} onChange={handleRoleChange}>
                    <option value="admin">Admin</option>
                    <option value="member">Membre</option>
                </select>
                <button className="delete">Supprimer</button>
                <hr/>
            </li>
            );
    })


    return (
        <>
            <h2>Membre de voyage</h2>
            <form>
                <span>Inviter membre</span>
                <input placeholder="email" type="email"/>
                <select>
                    <option value="member">Membre</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" className="button-new"></button>
            </form>
            <h3>Membres</h3>
            <hr/>
            <span>Nom</span>
            <span>Role</span>
            <hr/>
            <ul>{listMembers}</ul>



        </>
    )
}

export default Admin;