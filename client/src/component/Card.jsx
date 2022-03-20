import React from 'react';

const Card = (props) => {
    const { data, onClickDelete, onClickEdit, showMapData, isSelected } = props;
    return (
        <div className={`card ${isSelected ? "selected" : ""}`} onClick={showMapData}>
            <h6>{data.name}</h6>
            <div className='status'>
                <div>{`Status : ${data.status}`}</div>
                <div>{`Direction : ${data.direction}`}</div>
            </div>
            <div className='stops'>
                <h6>{"Stops :"}</h6>
                <ul className='list'>
                    {data?.stops?.map((item, index) => {
                        return (
                            <li key={index}>{item.name}</li>
                        )
                    })}
                </ul>
            </div>
            <div className='actions'>
                <button onClick={onClickDelete} type="button" className="btn btn-outline-dark" data-toggle="modal" data-target="#exampleModal">Delete</button>
                <button onClick={onClickEdit} type="button" className="btn btn-outline-dark">EDIT</button>
            </div>
        </div>
    )
}

export default Card