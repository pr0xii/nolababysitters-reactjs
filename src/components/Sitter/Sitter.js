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
      <div>
        <h3>Navigation</h3>
        { this.renderThumbs() }
        <button onClick={() => this.Carousel._slidePrev()}>Prev button</button>
        <button onClick={() => this.Carousel._slideNext()}>Next button</button>
        <h3>React Alice Carousel</h3>
        <AliceCarousel
          dotsDisabled={true}
          buttonsDisabled={true}
          ref={ el => this.Carousel = el }
        >
          <div className="yours-custom-class"><h2>Test One</h2></div>
          <div className="yours-custom-class"><h2>Test Two</h2></div>
          <div className="yours-custom-class"><h2>Test Three</h2></div>
          <div className="yours-custom-class"><h2>Test Four</h2></div>
          <div className="yours-custom-class"><h2>Test Five</h2></div>
        </AliceCarousel>
      </div>
    );
  }
}

export default Sitter;