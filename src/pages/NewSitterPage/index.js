import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'reactstrap';
import HireSitterForm from '../../components/HireSitterForm/HireSitterForm';
import { getSitter } from '../../firebase/utility';
import formatDate from '../../utitlity/formatDate';
import './styles.scss';

const NewSitterPage = props => {
    const today = new Date();
    let startTime = today.getHours() + 1;
    const isNextDay = startTime > 15
    if (isNextDay) {
        startTime = 8;
        today.setDate(today.getDate() + 1);
    }
    const currentDate = formatDate(today);

    const sitterId = props.match.params.id;
    const user = useSelector(({ user }) => user);
    const [sitter, setSitter] = useState('initial');
    useEffect(() => {
        getSitter(sitterId, user.uid, currentDate)
            .then(setSitter)
    }, [])

    switch (sitter) {
        case 'initial':
            return <Spinner />
        case false:
            return <div style={{ display: 'flex', height: '95vh' }}><h1 style={{ margin: 'auto' }}>404, not found!</h1></div>
        default:
            return (
                <div className="sitter-page-container">
                    <div className='container'>
                        <div className="sitter-box">
                            <div className='__sitter-page'>
                                <img alt='' src={sitter.photoURL} className='baby-siiter-image' />
                                <h2 style={{ textAlign: 'center' }}>{sitter.displayName}</h2>
                                <p>{sitter.bio}</p>
                                <HireSitterForm
                                    currentDate={currentDate}
                                    user={user}
                                    today={today}
                                    sitter={sitter}
                                    isNextDay={isNextDay}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
}



export default NewSitterPage;