import React from 'react';
import AddVeggieForm from './AddVeggieForm';

class Inventory extends React.Component {
  handleChange = (e, key) => {
    const veggie = this.props.veggies[key];
    const updatedVeggie = {
      ...veggie,
      [e.target.name]: e.target.value
    };
    this.props.updateVeggie(key, updatedVeggie);
  };

  renderInventory = ([key, veggie]) => {
    return (
      <div className="veggie-edit" key={key}>
        <input
          type="text"
          name="name"
          value={veggie.name}
          placeholder="Veggie Name"
          onChange={e => this.handleChange(e, key)}
        />
        <input
          type="text"
          name="price"
          value={veggie.price}
          placeholder="Veggie Price"
          onChange={e => this.handleChange(e, key)}
        />
        <select
          name="status"
          value={veggie.status}
          onChange={e => this.handleChange(e, key)}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          type="text"
          name="desc"
          value={veggie.desc}
          placeholder="Veggie Desc"
          onChange={e => this.handleChange(e, key)}
        />
        <input
          type="text"
          name="image"
          value={veggie.image}
          placeholder="Veggie Image"
          onChange={e => this.handleChange(e, key)}
        />
        <button onClick={() => this.props.removeVeggie(key)}>
          Remove Veggie
        </button>
      </div>
    );
  };

  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.entries(this.props.veggies).map(this.renderInventory)}
        <AddVeggieForm addVeggie={this.props.addVeggie} />
        <button onClick={this.props.loadSamples}>Load Sample Veggies</button>
      </div>
    );
  }
}

Inventory.propTypes = {
  veggies: React.PropTypes.object.isRequired,
  addVeggie: React.PropTypes.func.isRequired,
  updateVeggie: React.PropTypes.func.isRequired,
  removeVeggie: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired
};

export default Inventory;
