import React from 'react'
import "../css/map.css"
import { MapContainer, TileLayer} from 'react-leaflet'
import ChangeView from './ChangeView'
import { showDataOnMap } from './utils'

const Map = ({countries,casesType,center,zoom}) => {

    return (
        <div className="map">
           <MapContainer center={center} zoom={zoom}>
           <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
           />
           <ChangeView center={center} zoom={zoom}/>
           {/*Loop through all the countires and drwa circles  */}
            {showDataOnMap(countries,casesType)}
         </MapContainer>
        </div>
    )
}

export default Map
