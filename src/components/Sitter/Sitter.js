import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

class Sitter extends React.Component {
  renderThumbs = () =>
    <ul>
      {
        [1,2,3,4,5].map((item, i) =>
          <li key={i} onClick={() => this.Carousel._onDotClick(i)}>Thumb {item}</li>)
      }
    </ul>;

  render() {
    return (
      <AliceCarousel>
    <img src="https://via.placeholder.com/300/09f/fff.png" className="yours-custom-class" />
    <img src="https://via.placeholder.com/300/09f/fff.png" className="yours-custom-class" />
    <img src="https://via.placeholder.com/300/09f/fff.png" className="yours-custom-class" />
    <img src="https://via.placeholder.com/300/09f/fff.png" className="yours-custom-class" />
    <img src="https://via.placeholder.com/300/09f/fff.png" className="yours-custom-class" />
  </AliceCarousel>
    );
  }
}

export default Sitter;