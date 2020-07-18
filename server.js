const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const characters = [
  {
    name: 'Yoda',
    role: 'Jedi Master',
    age: 900,
    forcePoints: 2000,
    routeName: 'yoda'
  },
  {
    name: 'Darth Maul',
    role: 'Sith Lord',
    age: 200,
    forcePoints: 1200,
    routeName: 'darthmaul'
  },
  {
    name: "Obi Wan",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200,
    routeName: 'obiwan'
  },
  {
    name: "Anakin Skywalker",
    role: "Sith Lord",
    age: 18,
    forcePoints: 1500,
    routeName: 'anakinskywalker'
  }
]

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/add', (req, res) => {
  res.sendFile(path.join(__dirname, 'add.html'))
})

app.get('/api/characters', (req, res) => {
  res.json(characters)
})

app.get('/api/characters/:character', (req, res) => {
  const chosen = req.params.character
  const found = characters.find(char => char.routeName === chosen)
  if (found) {
    res.json(found)
  }
  res.json(false)
})

app.post('/api/characters', (req, res) => {
  const newCharacterData = req.body

  newCharacterData.routeName = newCharacterData.name.replace(/\s+/g, '').toLowerCase()

  characters.push(newCharacterData)
  res.json(newCharacterData)
})

app.listen(PORT, () => {
  console.log(`Server listening at Port: ${PORT}`)
})