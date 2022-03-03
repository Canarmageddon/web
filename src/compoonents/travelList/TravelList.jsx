import React, {useState} from "react";
import {Tabs, Tab, Container} from 'react-bootstrap';

const travels = ['NY', 'Ukraine', 'Paris'];
const listDest = travels.map((travel) => {
    return(
    <li key={travel}>
        {travel}
        <hr/>
    </li>
    );
    
});


const TravelsList = ({user}) => {
    const [timing, setTiming] = useState("planned");
    const [role, setRole] = useState("admin");

    return (
        <div className="root-list">
            <h1 className="list-title">Voyages</h1>
            <button className="button-new">Nouveau voyage</button>
            <hr style={{marginBottom: 5+'px'}}/>

            
            <Tabs
                id="tabs-timing"
                activeKey={timing}
                onSelect={(k) => setTiming(k)}
                className="tabs-travel"
            >
                <Tab eventKey="planned" title="Voyages planifies">
                </Tab>
                <Tab eventKey="past" title="Historique">
                </Tab>
            </Tabs>
            {/* <button class="button-tab">Voyages planifies</button>
            <button class="button-tab">Historique</button> */}

            <Tabs
                id="tabs-role"
                activeKey={role}
                onSelect={(k) => setRole(k)}
                className="tabs-travel"
            >
                <Tab eventKey="admin" title="Admin">
                </Tab>
                <Tab eventKey="member" title="Membre">
                </Tab>
            </Tabs>

            <ul>{listDest}</ul>
        </div>
    );
}

export default TravelsList;