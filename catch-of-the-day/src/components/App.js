import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Veggie from './Veggie';
import sampleVeggies from '../sample-veggies';

class App extends React.Component {
  state = {
    veggies: {},
    order: {}
  };

  addVeggie = veggie => {
    const veggies = { ...this.state.veggies };

    const timestamp = Date.now();

    veggies[`veggie-${timestamp}`] = veggie;

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
        <Order />
        <Inventory addVeggie={this.addVeggie} loadSamples={this.loadSamples} />
      </div>
    );
  }
}

export default App;
