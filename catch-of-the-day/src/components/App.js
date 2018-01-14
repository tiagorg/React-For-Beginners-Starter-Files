import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
  state = {
    veggies: {},
    order: {}
  };

  addVeggie = veggie => {
    const veggies = {...this.state.veggies};

    const timestamp = Date.now();

    veggies[`veggie-${timestamp}`] = veggie;

    this.setState({ veggies });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Vegan Food Market" />
        </div>
        <Order />
        <Inventory addVeggie={ this.addVeggie }/>
      </div>
    );
  }
}

export default App;