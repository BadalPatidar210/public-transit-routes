import { GoogleMap, withGoogleMap } from "react-google-maps";
import Polyline from "react-google-maps/lib/components/Polyline";
import { compose, withProps } from "recompose";


const MyMap = compose(withProps({}), withGoogleMap)((props) => {
    const { path } = props;

    return (
        <GoogleMap
            defaultZoom={5}
            options={{
                mapTypeControl: false,
            }}
            defaultCenter={{ lat: 20.5937, lng: 78.9629 }}
        >
            <Polyline
                path={path}
                strokeColor={'#1a6ac7'}
                strokeOpacity={"0.7"}
                strokeWeight={"6"}
            />
        </GoogleMap>)
}
)

export default MyMap