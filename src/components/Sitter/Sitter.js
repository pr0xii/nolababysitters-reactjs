import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import Carousel from 'react-material-ui-carousel'
import './styles.css'

class Sitter extends React.Component {
  state = {
    activeItemIndex: 0
  }
  // renderThumbs = () =>
  //   <ul>
  //     {
  //       [1, 2, 3, 4, 5].map((item, i) =>
  //         <li key={i} onClick={() => this.Carousel._onDotClick(i)}>Thumb {item}</li>)
  //     }
  //   </ul>;
  // items = [
  //   <div className='crusual___item' style={{background: 'url(https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg)'}}>
  //     askaljs al;sk ;lksl k
  //   </div>,
  //   <img src="https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__340.jpg" />,
  //   <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" />,
  //   <img src="https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__340.jpg" />,
  //   <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" />,
  // ]
  render() {
    const items = [
      <div>1</div>,
      <div>2</div>,
      <div>3</div>,
      <div>4</div>
    ]
    return (
      <section>
        <ul className='__custome-slider'>
          {items.map((item, index) => <li key={index} className={`${this.state.activeItemIndex === index ? 'active' : ''}`}>{item}</li>)}
        </ul>
        <ul className='__custom-slider-dots'>
          {items.map((item, index) => <li key={index} className={`${this.state.activeItemIndex === index ? 'active' : ''}`} onClick={() => this.setState({ activeItemIndex: index })}></li>)}
        </ul>
      </section>
    );
  }
}

export default Sitter;