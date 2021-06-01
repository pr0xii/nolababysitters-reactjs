import React, { Component } from 'react';
import openingHours from '../../utitlity/openingHours';
import { getHireDetailsOfSpecificDate, hireBaySitter } from '../../firebase/utility';
import Spinner from '../../UI/Spinner';

class HireSitterForm extends Component {
    state = {
        ...this.props,
        availableHours: [...openingHours],
        isLoading: false,
        showSuccessMessage: false, error: "",
        selectedDate: "",
        startTime: "",
        endTime: "",
    }
    onDateChange = e => {
        const { value } = e.target;
        const { currentDate, today, sitter } = this.props;
        if ((new Date(value).getTime() > today.getTime()) || (currentDate === value)) {
            getHireDetailsOfSpecificDate(sitter.id, value)
                .then(snapShot => {
                    const sitterShedule = [];
                    snapShot.docs.forEach(doc => sitterShedule.push(doc.data()));
                    let sitterBusyForHours = 0;
                    const availableHours = openingHours.filter(chooseTime => {
                        if (sitterBusyForHours > 0) {
                            sitterBusyForHours--;
                            return false;
                        }
                        const isBabySitterHired = sitterShedule.find(sheduleTime => sheduleTime.startTime === chooseTime.value);
                        if (isBabySitterHired) {
                            sitterBusyForHours = isBabySitterHired.endTime - isBabySitterHired.startTime;
                            return false;
                        }
                        return true;
                    })
                    this.setState({ selectedDate: value, startTime: "", endTime: "", availableHours, showSuccessMessage: false })
                })
        }
    }
    onSubmit = e => {
        e.preventDefault();
        const { sitter, startTime, endTime, selectedDate } = this.state;
        if (endTime === "" || startTime === "" || endTime === "") return this.setState({ error: "Please fill out all the fields", showSuccessMessage: false });
        this.setState({ isLoading: true, error: "", showSuccessMessage: false });
        const {user} = this.props;
        const hireDetails = {
            sitterId: sitter.id,
            startTime: +startTime,
            endTime: +endTime,
            selectedDate,
            customerId: this.props.user.uid,
            sitterName: sitter.displayName,
            sitterPhotoURL: sitter.photoURL,
            customerName: user.displayName,
            customerEmail: user.email,
            customerPhotoURL: user.photoURL,
        }
        hireBaySitter(hireDetails)
            .then(({ id }) => {
                hireDetails.id = id;
                sitter.hired.push(hireDetails);
                this.setState({ sitter, isLoading: false, showSuccessMessage: true, isSitterHiredByCurrentUser: true, selectedDate: "", startTime: "", endTime: "" })
            })
            .catch(err => console.log(err))
    }
    getTime = time => {
        const findTime = openingHours.find(t => t.value === time);
        if (findTime) return findTime.time;
    }
    render() {
        const { selectedDate, availableHours, startTime, endTime, isLoading, showSuccessMessage, error, sitter } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                {sitter.hired.map(hireDetails => (
                    <div key={hireDetails.id} className='hire-details-box'>
                        You have hired him/her
                        <div>Date {hireDetails.selectedDate}</div>
                        <div>Start Time {this.getTime(hireDetails.startTime)}</div>
                        <div>End Time {this.getTime(hireDetails.endTime)}</div>
                    </div>
                ))}
                <label>
                    <span className="label">Enter a Date</span>
                    <input className="field" type='date' placeholder='Choose Date' value={selectedDate} onChange={this.onDateChange} />
                </label>
                {selectedDate !== "" && (
                    <>
                        <div>
                            <span className="label">Start Time</span>
                            <select className="field" value={startTime} onChange={e => this.setState({ startTime: +e.target.value, endTime: +e.target.value + 1 })} name='startTime'>
                                <option value="" disabled>Select Start Time</option>
                                {availableHours.slice(0, availableHours.length - 1).map(time => (
                                    <option key={time.value} value={time.value}>
                                        {time.time}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {startTime !== "" && (
                            <>
                                <div>
                                    <span className="label">End Time</span>
                                    <select className="field" value={endTime} name='endTime' onChange={e => this.setState({ endTime: +e.target.value })}>
                                        <option value="" disabled>Select End Time</option>
                                        {availableHours.map(time => time.value > startTime && (
                                            <option key={time.value} value={time.value}>
                                                {time.time}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {endTime !== "" && (
                                    isLoading ? <Spinner /> : <button className='btn'>Hire</button>
                                )}
                            </>
                        )}
                    </>
                )}
                {showSuccessMessage && <div>Successful</div>}
                <div>{error}</div>
            </form>
        )
    }
}

export default HireSitterForm;