import React from 'react';
import { Component } from 'react';
import { getHireDetailsOfSpecificDate, getSitter, hireBaySitter } from '../../firebase/utility';
import './SitterPage.scss';
import { connect } from 'react-redux';
import Spinner from '../../UI/Spinner';
import { Link } from 'react-router-dom'

const chooseTime = [
    { time: '08:00am', value: 8 },
    { time: '09:00am', value: 9 },
    { time: '10:00am', value: 10 },
    { time: '11:00am', value: 11 },
    { time: '12:00pm', value: 12 },
    { time: '01:00pm', value: 13 },
    { time: '02:00pm', value: 14 },
    { time: '03:00pm', value: 15 },
    { time: '04:00pm', value: 16 },
]

const formatedDate = (date = new Date()) => {
    let day = date.getDate().toString();
    if (day.length < 2) day = `0${day}`;
    let month = (date.getMonth() + 1).toString();
    if (month.length < 2) month = `0${month}`;
    const year = date.getFullYear();
    const formatedDate = `${year}-${month}-${day}`
    return formatedDate;
}

class SitterPage extends Component {
    getTime = time => {
        const findTime = chooseTime.find(t => t.value === time);
        if (findTime) return findTime.time;
    }
    state = {
        sitter: 'initial',
        selectedDate: null,
        startTime: null,
        endTime: null,
        isLoading: false,
        availableTimes: [],
    }

    componentDidUpdate() {
        const { user } = this.props;
        const { sitter, availableTimes } = this.state;
        if (sitter === 'initial' && user && availableTimes.length < 1) {
            const id = this.props.match.params.id;
            const date = new Date()
            const selectedDate = formatedDate(date);
            this.dateHandler(selectedDate);
            getSitter(id, user.uid, selectedDate).then(sitter => {
                if (!sitter) return this.setState({ sitter: undefined });
                sitter.id = id;
                this.setState({ sitter });
            })
        }
    }

    onDateChange = e => {
        const { value } = e.target;
        const currentDate = new Date().getTime();
        const selectedDate = new Date(value).getTime();
        if (selectedDate >= currentDate) this.dateHandler(value)
    }

    dateHandler = (value) => {
        const date = new Date();
        getHireDetailsOfSpecificDate(this.state.sitter.id, value)
            .then(snapshot => {
                const selectedDate = new Date(value);
                let startTime = date.getHours();
                startTime < 8 && (startTime = 8);

                const sitterShedule = [];
                snapshot.docs.forEach(doc => {
                    sitterShedule.push(doc.data());
                })
                const availableTimes = chooseTime.filter(chooseTime => {
                    const isBabySitterHired = sitterShedule.find(sheduleTime => sheduleTime.startTime === chooseTime.value);
                    if (isBabySitterHired) return false
                    return true;
                })
                this.setState({ availableTimes, selectedDate: value, startTime, endTime: startTime + 1 })
            })
    }

    onStartTimeChange = e => {
        this.setState({ startTime: e.target.value, endTime: e.target.value + 1 })
    }


    onEndTimeChange = e => this.setState({ endTime: e.target.value })
    onSubmit = () => {
        this.setState({ isLoading: true });
        const { sitter, startTime, endTime, selectedDate } = this.state;
        const hireDetails = {
            sitterId: sitter.id,
            startTime,
            endTime,
            selectedDate,
            userId: this.props.user.uid
        }
        const isABackup = this.props.match.params.startTime;
        if (isABackup) {
            hireDetails.asABackup = true;
        }
        hireBaySitter(hireDetails)
            .then(res => this.setState({ isLoader: false, showSuccessMessage: true, isSitterHiredByCurrentUser: true }))
            .catch(err => console.log(err))
    }
    render() {
        const { sitter, isLoading, availableTimes, showSuccessMessage } = this.state;
        const isSitterHiredByCurrentUser = sitter !== 'initial' && sitter !== undefined && sitter.hired.find(sitterHire => sitterHire.userId === this.props.user.uid)
        switch (sitter) {
            case "initial":
                return <Spinner className="loader" />
            case undefined:
                return <h2>404, not found!</h2>
            default:
                return (
                    <div className="sitter-page-container">
                        <div className="container">
                            <div className="sitter-box">
                                <div className='__sitter-page'>
                                    <div className='sitter-box'>
                                        {sitter.hired.map(hireDetails => (
                                            <div key={hireDetails.id}>
                                                You have hired him/her
                                                <div>Date {hireDetails.selectedDate}</div>
                                                <div>Start Time {this.getTime(hireDetails.startTime)}</div>
                                                <div>End Time {this.getTime(hireDetails.endTime)}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <img alt='' src={sitter.photoURL} className='baby-siiter-image' />
                                    <h2 style={{ textAlign: 'center' }}>{sitter.displayName}</h2>
                                    <p>
                                        {sitter.bio}
                                    </p>
                                    <div>
                                        <label>
                                            <span className="label">Date</span>
                                            <input className="field" type='date' placeholder='Choose Date' value={this.state.selectedDate} onChange={this.onDateChange} />
                                        </label>
                                        <div>
                                            <span className="label">Start Time</span>
                                            <select className="field" value={this.state.startTime} onChange={this.onStartTimeChange} name='startTime'>
                                                {chooseTime.slice(0, chooseTime.length - 1).map(time => (
                                                    <option key={time.value} value={time.value}>
                                                        {time.time}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <span className="label">End Time</span>
                                            <select className="field" value={this.state.endTime} name='endTime' onChange={this.onEndTimeChange}>
                                                {chooseTime.map(time => time.value > this.state.startTime && (
                                                    <option key={time.value} value={time.value}>
                                                        {time.time}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {showSuccessMessage && <div>Successfull</div>}
                                    {isLoading && !showSuccessMessage ? <Spinner /> : <button onClick={this.onSubmit} className='btn'>Hire</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                )
        }
    }
}


const mapStateToProps = store => {
    return {
        user: store.user,
    }
}

export default connect(mapStateToProps)(SitterPage);
