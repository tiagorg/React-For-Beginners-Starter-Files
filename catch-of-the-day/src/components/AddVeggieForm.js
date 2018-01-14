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
  }

  render() {
    return (
      <form ref={input => this.form = input} className="veggie-edit" onSubmit={this.createVeggie}>
        <input ref={ input => this.name = input } type="text" placeholder="Veggie Name" />
        <input ref={ input => this.price = input } type="text" placeholder="Veggie Price" />
        <select ref={ input => this.status = input }>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea ref={ input => this.desc = input } type="text" placeholder="Veggie Desc" />
        <input ref={ input => this.image = input } type="text" placeholder="Veggie Image" />
        <button type="submit">+ Add Item</button>
      </form>
    );
  }
}

export default AddVeggieForm;