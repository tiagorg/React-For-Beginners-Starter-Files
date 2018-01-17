import React from 'react';

class AddVeggieForm extends React.Component {
  createVeggie = event => {
    event.preventDefault();

    const veggie = {
      name: this.name.value,
      price: this.price.value,
      status: this.status.value,
      desc: this.desc.value,
      image: this.image.value
    };

    this.props.addVeggie(veggie);
    this.form.reset();
  };

  setRef = field => input => (this[field] = input);

  render() {
    return (
      <form
        ref={this.setRef('form')}
        className="veggie-edit"
        onSubmit={this.createVeggie}
      >
        <input
          ref={this.setRef('name')}
          type="text"
          placeholder="Veggie Name"
        />
        <input
          ref={this.setRef('price')}
          type="text"
          placeholder="Veggie Price"
        />
        <select ref={this.setRef('status')}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          ref={this.setRef('desc')}
          type="text"
          placeholder="Veggie Desc"
        />
        <input
          ref={this.setRef('image')}
          type="text"
          placeholder="Veggie Image"
        />
        <button type="submit">+ Add Item</button>
      </form>
    );
  }
}

AddVeggieForm.propTypes = {
  addVeggie: React.PropTypes.func.isRequired
};

export default AddVeggieForm;
