import React from 'react';
import {connect} from 'react-redux';

const TestingStore = props => {
    console.log(props);
    return (
        <div></div>
    )
}

const mapStateToProps = store => {
    return {
        user: store.user
    }
}

export default connect(mapStateToProps)(TestingStore);