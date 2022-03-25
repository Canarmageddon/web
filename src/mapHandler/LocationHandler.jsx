import Layer from "./layers/Layer"
import Location from "./layers/Location"
import React from "react"
import { fetchPointOfInterest } from "../apiCaller"
export default class LocationHandler extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            poiLayer: new Layer(props.poi),
            stepLayer: new Layer(props.step)
        }
    }
    async componentDidMount() {
        const poi = await fetchPointOfInterest()
        let lstPoi = []
        poi.map(item => lstPoi.push(new Location(item.id, item.description, item.location.longitude, item.location.latitude)));
        const newLayer = this.state.poiLayer.addItems(lstPoi)
        this.setState({ poiLayer: newLayer, stepLayer: new Layer() })
    }

    addItem(id, description, long, lat) {
        if (this.props.typeLocation) this.setState({ poiLayer: this.state.poiLayer.addItem(new Location(id, description, long, lat)) })
        else {
            this.setState({ stepLayer: this.state.stepLayer.addItem(new Location(id, description, long, lat)) })
            generateRoute()
        }
    }
    removeItem(item) {
        this.setState({ poiLayer: this.state.poiLayer.removeItem(item) })
    }
    getTemplateLayer() {
        return this.state.poiLayer.getTemplateLayer;
    }
    render() {

        return <></>
    }
}