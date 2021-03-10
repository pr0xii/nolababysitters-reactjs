import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import Carousel from 'react-material-ui-carousel'
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
    return (
      <section className='__sitters-section'>
        {sitters ? sitters.map((sitter) => (
          <div key={sitter.id} className='__sitter'>
            <img src={sitter.photoURL} alt={sitter.name} />
            <h4>{sitter.displayName}</h4>
            <p>{sitter.bio}</p>
            <Link to={`/sitter/${sitter.id}`}>More Info</Link>
          </div>
        )): <Spinner />}
      </section>
    );
  }
}

export default Sitter;