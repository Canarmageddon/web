import LayerUtile from "./layers/LayerUtile"
import Location from "./layers/Location"
import React from "react"
import { fetchPointOfInterest, fetchStep } from "../apiCaller"
export default class LocationHandler {
    constructor(props) {
        this.state = {
            poiLayer: new LayerUtile(),
            stepLayer: new LayerUtile()
        }
    }
    async fetchLocations() {
        const poi = await fetchPointOfInterest();
        const step = await fetchStep();
        let lstPoi = []
        let lstStep = [];
        poi.map(item => lstPoi.push(new Location(item.id, item.description, item.location.longitude, item.location.latitude)));
        step.map((item) => lstStep.push(new Location(item.id, item.description, item.location.longitude, item.location.latitude)));
        this.setState({
            poiLayer: this.state.poiLayer.addItems(lstPoi),
            stepLayer: this.state.poiLayer.addItems(lstStep)
        })
        generateRoute()
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
        generateRoute()
    }
    getTemplateLayer() {
        return this.state.poiLayer.getTemplateLayer;
    }

}