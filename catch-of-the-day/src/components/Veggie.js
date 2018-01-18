import React from 'react';
import { formatPrice } from '../helpers';

class Veggie extends React.Component {
  render() {
    const { details, index } = this.props;
    const isAvailable = details.status === 'available';
    const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';
    return (
      <li className="menu-veggie">
        <img src={details.image} alt={details.name} />
        <h3 className="veggie-name">
          {details.name}
          <span className="price">{formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button
          onClick={() => this.props.addToOrder(index)}
          disabled={!isAvailable}
        >
          {buttonText}
        </button>
      </li>
    );
  }

  static propTypes = {
    details: React.PropTypes.object.isRequired,
    index: React.PropTypes.string.isRequired,
    addToOrder: React.PropTypes.func.isRequired
  };
}

export default Veggie;
