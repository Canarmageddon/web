import React from "react";

class PopUpHandler extends React.Component {
    constructor(props) {
        super();
        this.state = {
            display: false,
            idPopUp: null,
            description: null
        }
    }
    handleChangeDescription(e) {
        this.setState({ description: e })
    }
    handleClick(id, description) {
        updatePlacesDescription(id, description);
        this.setState({ display: false, idPopUp: null, description: null })
    }
    render() {
        console.log(this.state.description)
        return (
            <>
                {this.state.display &&
                    <div id="popup" style={{ position: "absolute", right: 0 }}>
                        <p>Entrez vos informations</p>
                        <input value={this.state.description} onChange={(e) => this.handleChangeDescription(e.target.value)} type="textarea" />
                        <button onClick={() => this.handleClick(this.state.idPopUp, this.state.description)}>valider</button>
                    </div>}
            </>
        )
    }
}
export default PopUpHandler;