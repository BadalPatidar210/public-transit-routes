import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { deleteRouteUrl, getRoutesUrl } from '../utility/base';
import Card from "./Card";
import DeleteModal from "./modals/DeleteModal";
import MyMap from "./MyMap";
function RouteView() {
    const navigate = useNavigate();
    const [showMarker, setShowMarker] = React.useState(true);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [selectedElement, setSelectedElement] = React.useState({});
    const [routesArray, setRoutesArray] = React.useState([]);
    const [refresh, setRefresh] = React.useState(false);

    const delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({ isMarkerShown: true })
        }, 3000)
    }

    const handleMarkerClick = () => {
        setShowMarker(false);
        delayedShowMarker();
    }

    useEffect(() => {
        fetch(getRoutesUrl).then(res => res.json()).then(result => {
            setRoutesArray(result);
            setSelectedElement(result[0])
        })
    }, [refresh])

    return (
        <div className='main-div'>
            <DeleteModal
                titleMessage={"Are you sure you want to delete route?"}
                open={openDeleteModal}
                onClose={() => {
                    setOpenDeleteModal(false)
                }}
                data={selectedElement}
                onSuccess={(element) => {
                    setOpenDeleteModal(false)
                    fetch(deleteRouteUrl + `${element.id}`, {
                        method: "DELETE"
                    }).then(response => response.json()).then((result) => {
                        setRefresh(!refresh);
                    })
                }}
            />

            <div className='left-div'>
                {/* <h3>Route View</h3> */}
                <div><button type='button' className={'add-route-button'} onClick={() => {
                    navigate('routes')
                }}><i class="fa fa-plus" aria-hidden="true"></i>Add Route</button></div>
                <div className='all-cards'>
                    {routesArray && routesArray.map((item, index) => {
                        return (
                            <Card
                                key={index}
                                data={item}
                                isSelected={item.id === selectedElement.id}
                                onClickDelete={() => {
                                    setOpenDeleteModal(true)
                                    setSelectedElement(item);
                                }}
                                onClickEdit={() => {
                                    setSelectedElement(item);
                                    navigate('/routes', { state: item })
                                }}
                                showMapData={() => {
                                    setSelectedElement(item);
                                }}
                            />
                        )
                    })}
                </div>
            </div>
            <div className='right-div'>
                <div>
                    {selectedElement && <MyMap
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `600px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        onMarkerClick={() => handleMarkerClick()}
                        path={selectedElement?.stops?.map(elem => {
                            return {
                                lat: +elem.latitude,
                                lng: +elem.longitude
                            }
                        }) || []}
                    />}
                </div>
            </div>
        </div>
    )
}

export default RouteView;