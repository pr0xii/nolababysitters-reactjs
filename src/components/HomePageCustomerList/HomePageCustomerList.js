import React, { useState, useEffect } from 'react';
import { getAllCustomers } from '../../firebase/utility';
import Spinner from '../../UI/Spinner';
import openingHours from '../../utitlity/openingHours'

const HomePageCustomerList = props => {
    const [customerList, setCustomerList] = useState('initial');
    const getTime = time => {
        const findTime = openingHours.find(t => t.value === time);
        if (findTime) return findTime.time;
    }
    useEffect(() => {
        getAllCustomers(props.user.uid)
            .then(setCustomerList)
    }, [])
    return (
        <div>
            {customerList === 'initial' ? <Spinner /> : (
                <div className="container">
                    <div className="sitters-box">
                        <section className='__sitters-section'>
                            {customerList.length > 0 ? customerList.map((parent) => (
                                <div key={parent.id} className='__sitter'>
                                    <img src={parent.customerPhotoURL} />
                                    <div>
                                        <h4>{parent.customerName}</h4>
                                        <h5>{parent.customerEmail}</h5>
                                    </div>
                                    <p>{parent.selectedDate} <br /> {getTime(parent.startTime)} - {getTime(parent.endTime)}</p>
                                    {/* <Link to={`/sitter/${parent.customerId}`}>More Info</Link> */}
                                </div>
                            )) : (
                                <div>
                                    <p>You have not hired yet!</p>
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            )}
        </div>
    )
}

export default HomePageCustomerList;