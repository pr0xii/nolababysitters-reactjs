import React from 'react';
import { Component } from 'react';
import { getSitter, hireBaySitter } from '../../firebase/utility';
import './SitterPage.scss';
import { connect } from 'react-redux';
import Spinner from '../../UI/Spinner';

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

class SitterPage extends Component {
    getTime = time => {
        return chooseTime.find(t => t.value === time).time;
    }
    state = {
        sitter: 'initial',
        selectedDate: null,
        startTime: null,
        endTime: null,
        isLoading: false,
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        const date = new Date();
        let day = date.getDate().toString();
        if (day.length < 2) day = `0${day}`;
        let month = (date.getMonth() + 1).toString();
        if (month.length < 2) month = `0${month}`;
        const year = date.getFullYear();
        const formatedDate = `${year}-${month}-${day}`

        getSitter(id).then(sitter => {
            if (!sitter) return this.setState({ sitter: undefined });
            sitter.id = id;
            this.setState({ sitter, selectedDate: formatedDate, startTime: date.getHours() + 1, endTime: date.getHours() + 2 });
        })
    }

    onDateChange = e => {
        const { value } = e.target;

        const date = new Date();
        let day = date.getDate().toString();
        if (day.length < 2) day = `0${day}`;
        let month = (date.getMonth() + 1).toString();
        if (month.length < 2) month = `0${month}`;
        const year = date.getFullYear();
        const formatedDate = `${year}-${month}-${day}`;

        const currentDate = new Date(formatedDate).getTime();
        const selectedDate = new Date(value).getTime();

        if (selectedDate >= currentDate) this.setState({ selectedDate: value })

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
        hireBaySitter(hireDetails)
            .then(res => this.setState({ isLoader: false }))
            .catch(err => console.log(err))
    }
    render() {
        const { sitter } = this.state;
        switch (sitter) {
            case "initial":
                return <Spinner />
            case undefined:
                return <h2>404, not found!</h2>
            default:
                return (
                    <div className='__sitter-page'>
                        <div>
                            {sitter.hired.map(hireDetails => hireDetails.userId === this.props.user.uid && (
                                <div>
                                    You have hired him/her
                                    <div>Date {hireDetails.selectedDate}</div>
                                    <div>Start Time {this.getTime(hireDetails.startTime)}</div>
                                    <div>End Time {this.getTime(hireDetails.endTime)}</div>
                                </div>
                            ))}
                        </div>
                        <img alt='' src={sitter.photoURL} />
                        <h2 style={{ textAlign: 'center' }}>{sitter.displayName}</h2>
                        <p>
                            {sitter.bio}
                        </p>
                        <div className='input-field'>
                            <span>Choose Date</span>
                            <input type='date' value={this.state.selectedDate} onChange={this.onDateChange} />
                        </div>
                        <div>
                            <div>
                                <span>Start TIme</span>
                                <select value={this.state.startTime} onChange={this.onStartTimeChange} name='startTime'>
                                    {chooseTime.slice(0, chooseTime.length - 1).map(time => (
                                        <option key={time.value} value={time.value}>
                                            {time.time}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <span>End TIme</span>
                                <select value={this.state.endTime} name='endTime' onChange={this.onEndTimeChange}>
                                    {chooseTime.map(time => time.value > this.state.startTime && (
                                        <option key={time.value} value={time.value}>
                                            {time.time}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {this.state.isLoading ? <Spinner /> : <button onClick={this.onSubmit}>Hired</button>}
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