import PointOfInterestLayer from "./layers/PointOfInterestLayer"
import PointOfInterest from "./layers/PointOfInterest"
import React from "react"
import { fetchPointOfInterest } from "../apiCaller"

export default class PoiHandler extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            poiLayer: new PointOfInterestLayer(props.poi)
        }
    }
    async componentDidMount() {
        const poi = await fetchPointOfInterest()
        let lstPoi = []
        poi.map(item => lstPoi.push(new PointOfInterest(item.id, item.description, item.location.longitude, item.location.latitude)));
        const newLayer = this.state.poiLayer.addItems(lstPoi)
        this.setState({ poiLayer: newLayer })
    }

    addItem(id, description, long, lat) {
        this.setState({ poiLayer: this.state.poiLayer.addItem(new PointOfInterest(id, description, long, lat)) })
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