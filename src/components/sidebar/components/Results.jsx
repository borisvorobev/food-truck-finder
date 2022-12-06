import React from 'react';
import './Results.css';

import foodTruck from '../../../assets/icons/food-truck.png';
import foodCart from '../../../assets/icons/food-cart.png';

const Results = ({ selectedTruck, trucks = [], onTruckSelect = () => {} }) => (
    !!trucks.length ? (
        <ul className="results">
            {
                trucks.map((truck, id) => (
                    <li ref={truck.ref || selectedTruck?.ref} key={`truck-${truck.objectid}-${id}`} className={`${selectedTruck?.objectid === truck.objectid? 'result--selected ' : ''}results__item`} onClick={() => onTruckSelect(truck)} tabIndex="0">
                        <img className="results__image" src={truck.facilitytype === 'Truck' ? foodTruck : foodCart} />
                        <div className="results__info">
                            <h4 className="results__item-name">
                                {truck.applicant}
                            </h4>
                            <i className="results__item-address">
                                {truck.locationdescription}
                            </i>
                            <hr />
                            <div className="results__item-food">
                                {truck.fooditems}
                            </div>
                        </div>
                    </li>
                ))
            }
        </ul>
    ) : <p>No results for this query</p>
)

export default Results;