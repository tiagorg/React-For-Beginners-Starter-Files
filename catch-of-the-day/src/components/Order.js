import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
  renderOrder = key => {
    const veggie = this.props.veggies[key];
    const count = this.props.order[key];
    const removeButton = (
      <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
    );

    if (veggie) {
      if (veggie.status === 'unavailable') {
        return (
          <li key={key}>
            Sorry, {veggie ? veggie.name : 'veggie'} is no longer available!
            {removeButton}
          </li>
        );
      } else {
        return (
          <li key={key}>
            <span>
              {count}lbs {veggie.name} {removeButton}
            </span>
            <span className="price">{formatPrice(count * veggie.price)}</span>
          </li>
        );
      }
    }
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const veggie = this.props.veggies[key];
      const count = this.props.order[key];
      const isAvailable = veggie && veggie.status === 'available';

      return prevTotal + (isAvailable ? count * veggie.price || 0 : 0);
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </ul>
      </div>
    );
  }
}

Order.propTypes = {
  veggies: React.PropTypes.object.isRequired,
  order: React.PropTypes.object.isRequired,
  removeFromOrder: React.PropTypes.func.isRequired
};

export default Order;
