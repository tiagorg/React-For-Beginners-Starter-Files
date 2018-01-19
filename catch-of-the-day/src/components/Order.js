import React from 'react';
import { formatPrice } from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';

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
              <CSSTransitionGroup
                component="span"
                className="count"
                transitionName="count"
                transitionEnterTimeout={250}
                transitionLeaveTimeout={250}
              >
                <span key={count}>{count}</span>
              </CSSTransitionGroup>
              lbs {veggie.name} {removeButton}
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
        <CSSTransitionGroup
          className="order"
          component="ul"
          transitionName="order"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </CSSTransitionGroup>
      </div>
    );
  }

  static propTypes = {
    veggies: React.PropTypes.object.isRequired,
    order: React.PropTypes.object.isRequired,
    removeFromOrder: React.PropTypes.func.isRequired
  };
}

export default Order;
