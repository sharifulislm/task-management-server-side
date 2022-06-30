const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port =process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vdkxiw5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
try{
    await client.connect();
    const tasksCollection = client.db('tasks').collection('addtasks');
    console.log('Database connected');


    app.post('/tasks', async(req,res) => {
        const addtask = req.body;
        const result = await tasksCollection.insertOne(addtask);
        res.send(result);
      })

}
finally{

}


}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World FORM MY PC ')
})

app.listen(port, () => {
  console.log(`TASKS listening on port ${port}`)
})