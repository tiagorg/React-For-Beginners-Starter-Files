import React from 'react';
import AddVeggieForm from './AddVeggieForm';
import base from '../base';

class Inventory extends React.Component {
  state = {
    uid: null,
    owner: null
  };

  componentDidMount() {
    base.onAuth(user => {
      this.authHandler(null, { user });
    });
  }

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

  authenticate = provider => {
    console.log(`Logging in with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  };

  logout = () => {
    base.unauth();
    this.setState({
      uid: null
    });
  };

  authHandler = (error, authData) => {
    if (error) {
      console.error(error);
      return;
    }

    if (authData.user) {
      // grab the store info
      const storeRef = base.database().ref(this.props.storeId);

      // query the firebase once for the store data
      storeRef.once('value', snapshot => {
        const data = snapshot.val() || {};

        // claim it as our own if there is no owner already
        if (!data.owner) {
          storeRef.set({
            owner: authData.user.uid
          });
        }

        this.setState({
          uid: authData.user.uid,
          owner: data.owner || authData.user.uid
        });
      });
    }
  };

  renderLogin = () => {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onClick={() => this.authenticate('github')}>
          Log In with Github
        </button>
        <button
          className="facebook"
          onClick={() => this.authenticate('facebook')}
        >
          Log In with Facebook
        </button>
        <button
          className="twitter"
          onClick={() => this.authenticate('twitter')}
        >
          Log In with Twitter
        </button>
      </nav>
    );
  };

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;

    // check if they are logged in at all
    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>;
    }

    // check if they are the owner of the current store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you aren't the owner of this store!</p>
          {logout}
        </div>
      );
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.entries(this.props.veggies).map(this.renderInventory)}
        <AddVeggieForm addVeggie={this.props.addVeggie} />
        <button onClick={this.props.loadSamples}>Load Sample Veggies</button>
      </div>
    );
  }

  static propTypes = {
    veggies: React.PropTypes.object.isRequired,
    addVeggie: React.PropTypes.func.isRequired,
    updateVeggie: React.PropTypes.func.isRequired,
    removeVeggie: React.PropTypes.func.isRequired,
    loadSamples: React.PropTypes.func.isRequired,
    storeId: React.PropTypes.string.isRequired
  };
}

export default Inventory;
