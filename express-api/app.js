import express, { json } from 'express';
import cors from 'cors';
const app = express();
const port = 3000;

app.use(cors());
app.use(json());

let data = [
  { id: 1, title: 'Item 1' },
  { id: 2, title: 'Item 2' },
];

app.get('/data', (req, res) => res.json(data));
app.post('/data', (req, res) => {
  const newItem = { id: Date.now(), ...req.body };
  data.push(newItem);
  res.status(201).json(newItem);
});
app.delete('/data/:id', (req, res) => {
  data = data.filter((item) => item.id != req.params.id);
  res.status(204).send();
});

app.listen(port, () => console.log(`API running at http://localhost:${port}`));
