import React, { useEffect, useState } from 'react';
import { getAllHiredSitterbyUser } from '../../firebase/utility';
import Spinner from '../../UI/Spinner';
import { Link } from 'react-router-dom';
import openingHours from '../../utitlity/openingHours'

const UserSitterHireList = props => {
    const [hiredList, setHiredList] = useState('initial');
    const getTime = time => {
        const findTime = openingHours.find(t => t.value === time);
        if (findTime) return findTime.time;
    }
    useEffect(() => {
        getAllHiredSitterbyUser(props.user.uid)
            .then(setHiredList)
    }, [])
    return (
        <div className="sitters-page-container">
            {hiredList === 'initial' ? <Spinner /> : (
                <div className="container">
                    <div className="sitters-box">
                        <section className='__sitters-section'>
                            {hiredList.length > 0 ? hiredList.map((sitter) => (
                                <div key={sitter.id} className='__sitter'>
                                    <img src={sitter.sitterPhotoURL} alt={sitter.name} />
                                    <h4>{sitter.sitterName}</h4>
                                    <p>You have hired this sitter for: <br/>{sitter.selectedDate} <br /> {getTime(sitter.startTime)} - {getTime(sitter.endTime)} <br/>They will contact you via email soon.</p>
                                    <Link to={`/sitter/${sitter.sitterId}`}>More Info</Link>
                                </div>
                            )): (
                                <div>
                                    <p>You currently have no hired babysitters. Click here to <Link to='/sitters'>Hire a BabySitter</Link></p>
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserSitterHireList;