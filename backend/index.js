const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
  response.send('are coffee server is exits?');
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster-coffee.cwfb6he.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const run = async () => {
  try {
    await client.connect();
    const database = client.db('coffeeDB');
    const CoffeeCollection = database.collection('coffeeData');

    app.get('/coffee', async (request, response) => {
      const cursor = CoffeeCollection.find();
      const result = await cursor.toArray();
      response.send(result);
    });

    app.get('/coffee/:id', async (request, response) => {
      const id = request.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await CoffeeCollection.findOne(query);
      response.send(result);
    });

    app.post('/coffee', async (request, response) => {
      const newCoffee = request.body;
      const result = await CoffeeCollection.insertOne(newCoffee);
      response.send(result);
    });

    app.put('/coffee/:id', async (request, response) => {
      const id = request.params.id;
      const filterId = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const coffee = {
        $set: {
          coffeeName: request.body.coffeeName,
          coffeeQuantity: request.body.coffeeQuantity,
        },
      };
      const result = await CoffeeCollection.updateOne(
        filterId,
        coffee,
        options
      );
      response.send(result);
    });

    app.delete('/coffee/:id', async (request, response) => {
      const id = request.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await CoffeeCollection.deleteOne(query);
      response.send(result);
    });

    await client.db('admin').command({ ping: 1 });
    console.log('You successfully connected to MongoDB!');
  } catch (error) {
    console.dir(error);
  }
};

run();

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
