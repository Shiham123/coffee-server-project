import { useLoaderData } from 'react-router-dom';

const UpdateCoffee = () => {
  const loader = useLoaderData();
  const { coffeeName, coffeeQuantity, _id } = loader;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const coffeeName = formData.get('coffeeName');
    const coffeeQuantity = formData.get('coffeeQuantity');
    const coffeeData = { coffeeName, coffeeQuantity };
    console.log(coffeeData);

    fetch(`http://localhost:3000/coffee/${_id}`, {
      method: 'PUT',
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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Coffee Name : </label>
        <input type="text" name="coffeeName" defaultValue={coffeeName} />

        <label htmlFor="">Coffee Quantity : </label>
        <input
          type="number"
          name="coffeeQuantity"
          defaultValue={coffeeQuantity}
        />

        <button type="submit">Update coffee</button>
      </form>
    </div>
  );
};

export default UpdateCoffee;
