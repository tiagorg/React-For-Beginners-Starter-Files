import React from 'react';
import { formatPrice } from '../helpers';

class Veggie extends React.Component {
  render() {
    const { details } = this.props;
    return (
      <li className="menu-veggie">
        <img src={details.image} alt={details.name} />
        <h3 className="veggie-name">
          {details.name}
          <span className="price">{formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button>Add To Order</button>
      </li>
    );
  }
}

export default Veggie;