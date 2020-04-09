import { MapLayer, withLeaflet } from 'react-leaflet'
import "leaflet.markercluster/dist/leaflet.markercluster"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import L from 'leaflet'

class MarkerClusterGroup extends MapLayer {
    createLeafletElement({ children, leaflet: { map },setMarkerClusterObject }) {

        const markerClusterGroup = new L.markerClusterGroup(setMarkerClusterObject)
        this.contextValue = { layerContainer: markerClusterGroup, map }

        return markerClusterGroup
    }
}

export default withLeaflet(MarkerClusterGroup);
