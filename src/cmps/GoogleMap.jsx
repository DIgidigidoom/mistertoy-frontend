import { AdvancedMarker, APIProvider, InfoWindow, Map, Marker, Pin, useAdvancedMarkerRef, useMap } from "@vis.gl/react-google-maps"
import { useRef, useState } from "react"

const API_KEY = ''

export function GoogleMap() {
    const [coords, setCoords] = useState({
        lat: 32.0853,
        lng: 34.7818
    })
    const zoom = 11
    const [markerRef, marker] = useAdvancedMarkerRef();

    const map = useMap()

    function onMapClick(ev) {
        const newCoords = ev.detail.latLng
        setCoords(newCoords)
        ev.map.panTo(newCoords)
    }

    function onCenter(ev) {
        const startCoords = {
            lat: 32.0853,
            lng: 34.7818
        }
        map.panTo(startCoords)

    }

    function panToBranch(coords) {
        map.panTo(coords)

    }

    const startMarkers = [{ lat: 32.109333, lng: 34.855499 }, { lat: -34.6037, lng: -58.3816 }, { lat: 5.727662, lng: 10.885811 }]
    const style = { width: '40%', height: '40vh', margin: 'auto' }
    return (
        <section style={style} className="google-map">
            {/* <APIProvider apiKey={API_KEY}> */}
            <Map
                defaultZoom={zoom}
                mapId='main-map'
                defaultCenter={coords}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                onClick={onMapClick}
            >
                {/* <Marker position={coords} /> */}
                {/* <InfoWindow anchor={marker}>
                        The content of the info window is here❗️
                    </InfoWindow> */}
                {startMarkers.map((marker, idx) => (
                    <AdvancedMarker key={idx} ref={markerRef} position={marker}>
                        <Pin background="dodgerblue" glyphColor="hotpink" borderColor="black" />
                    </AdvancedMarker>
                ))}
            </Map>
            {/* </APIProvider> */}


            <button onClick={onCenter}>Center</button>
            <button onClick={() => panToBranch({ lat: 32.109333, lng: 34.855499 })}>Tel Aviv</button>
            <button onClick={() => panToBranch({ lat: -34.6037, lng: -58.3816 })}>Buenos Aires</button>
            <button onClick={() => panToBranch({ lat: 5.727662, lng: 10.885811 })}>Foumban</button>
        </section>
    )


}
