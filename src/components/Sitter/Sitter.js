import React from 'react';
import "react-alice-carousel/lib/alice-carousel.css";
import { getSitters } from '../../firebase/utility';
import './styles.scss'
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';

class Sitter extends React.Component {
  state = {
    sitters: null
  }
  componentDidMount() {
    getSitters().then(sitters => this.setState({ sitters }));
  }
  render() {
    const { sitters } = this.state;
    const path = this.props.location.pathname.replace(this.props.match.path, '')
    return (
        <div className="sitters-page-container">
          <div className="container">
            <div className="sitters-box">
              <section className='__sitters-section'>
                {sitters ? sitters.map((sitter) => (
                    <div key={sitter.id} className='__sitter'>
                      <img src={sitter.photoURL} alt={sitter.name} />
                      <h4>{sitter.displayName}</h4>
                      <p>{sitter.bio}</p>
                      <Link to={`/sitter/${sitter.id}${path}`}>Hire Sitter</Link>
                    </div>
                )): <Spinner className="loader" />}
              </section>
            </div>
          </div>
        </div>
    );
  }
}

export default Sitter;
