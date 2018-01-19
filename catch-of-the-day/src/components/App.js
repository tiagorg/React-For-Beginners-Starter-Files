import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Veggie from './Veggie';
import sampleVeggies from '../sample-veggies';
import base from '../base';

class App extends React.Component {
  state = {
    veggies: {},
    order: {}
  };

  componentWillMount() {
    this.ref = base.syncState(`${this.props.params.storeId}/veggies`, {
      context: this,
      state: 'veggies'
    });

    const localStorageRef = localStorage.getItem(
      `order-${this.props.params.storeId}`
    );
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(
      `order-${this.props.params.storeId}`,
      JSON.stringify(nextState.order)
    );
  }

  addVeggie = veggie => {
    const veggies = { ...this.state.veggies };

    const timestamp = Date.now();

    veggies[`veggie-${timestamp}`] = veggie;

    this.setState({ veggies });
  };

  updateVeggie = (key, updatedVeggie) => {
    const veggies = { ...this.state.veggies };
    veggies[key] = updatedVeggie;
    this.setState({ veggies });
  };

  removeVeggie = key => {
    const veggies = { ...this.state.veggies };
    veggies[key] = null;
    this.setState({ veggies });
  };

  loadSamples = () => {
    this.setState({
      veggies: sampleVeggies
    });
  };

  addToOrder = key => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  };

  removeFromOrder = key => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Vegan Food Market" />
          <ul className="list-of-veggies">
            {Object.entries(this.state.veggies).map(([key, details]) => (
              <Veggie
                key={key}
                index={key}
                details={details}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          removeFromOrder={this.removeFromOrder}
          veggies={this.state.veggies}
          order={this.state.order}
          params={this.props.params}
        />
        <Inventory
          addVeggie={this.addVeggie}
          updateVeggie={this.updateVeggie}
          removeVeggie={this.removeVeggie}
          loadSamples={this.loadSamples}
          veggies={this.state.veggies}
          storeId={this.props.params.storeId}
        />
      </div>
    );
  }

  static propTypes = {
    params: React.PropTypes.object.isRequired
  };
}

export default App;
