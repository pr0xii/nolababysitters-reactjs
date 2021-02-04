import React from 'react';
import './styles.css'

class Sitter extends React.Component {
  state = {
    activeItemIndex: 0
  }
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