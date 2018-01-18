import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  goToStore = event => {
    event.preventDefault();
    const storeId = this.storeInput.value;
    this.context.router.transitionTo(`/store/${storeId}`);
  };

  setRef = field => input => (this[field] = input);

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        {/* Hello */}
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
          ref={this.setRef('storeInput')}
        />
        <button type="submit">Visit Store</button>
      </form>
    );
  }

  static contextTypes = {
    router: React.PropTypes.object
  };
}

export default StorePicker;
