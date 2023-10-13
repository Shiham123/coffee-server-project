const AddCoffee = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const coffeeName = formData.get('coffeeName');
    const coffeeQuantity = formData.get('coffeeQuantity');

    const coffeeData = { coffeeName, coffeeQuantity };

    fetch('http://localhost:3000/coffee', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(coffeeData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Coffee Name : </span>
          </label>
          <label className="input-group">
            <span>Coffee Name</span>
            <input
              type="text"
              placeholder="Coffee name"
              name="coffeeName"
              className="input input-bordered"
            />
          </label>
        </div>
      </div>
      {/*  */}
      <div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Quantity : </span>
          </label>
          <label className="input-group">
            <span>Coffee Quantity : </span>
            <input
              type="number"
              placeholder="Coffee Quantity"
              name="coffeeQuantity"
              className="input input-bordered"
            />
          </label>
        </div>
      </div>
      <button className="btn" type="submit">
        Add Coffee
      </button>
    </form>
  );
};

export default AddCoffee;
