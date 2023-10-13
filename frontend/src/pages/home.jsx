import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const HomePage = () => {
  const loader = useLoaderData();

  const [coffee, setCoffee] = useState(loader);

  const handleDelete = (id) => {
    const deleteId = window.confirm('Do you want to delete this item?');
    if (deleteId) {
      fetch(`http://localhost:3000/coffee/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            setCoffee((prevCoffee) =>
              prevCoffee.filter((item) => item._id !== id)
            );
          }
          return response.json();
        })
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      {coffee.map((item, index) => {
        const { coffeeName, coffeeQuantity, _id } = item;
        return (
          <div key={index}>
            <h1>{coffeeName}</h1>
            <h2>{coffeeQuantity}</h2>
            <button className="btn" onClick={() => handleDelete(_id)}>
              Delete Coffee
            </button>
            <Link to={`/updateCoffee/${_id}`}>
              <button className="btn">Edit Coffee</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
