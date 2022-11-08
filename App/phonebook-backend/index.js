const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(cors())
app.use(express.json())


const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Martti Tienari",
    "number": "040-123456",
    "id": 2
  },
  {
    "name": "Arto Järvinen",
    "number": "040-123456",
    "id": 3
  },
  {
    "name": "Lea Kutvonen",
    "number": "040-123456",
    "id": 4
  }
]
// retrieve the root directory
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

// retrieve the json data 
app.get('/api/persons', (req, res) => {
  res.json(persons)
})


app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(i => i.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

const generatedId = () => {
  const maxId = persons.map(n => n.id).sort((a, b) => a - b).length
  return maxId + 1 + Math.random()

}

app.post('/api/persons', (request, response) => {
  //const maxId = persons.length > 0 ? persons.map(n => n.id).sort((a, b) => a - b).reverse()[0] : 1
  const person = request.body
  if (!person.name || !person.number) {
    return response.status(400).json({
      error: 'Name, Number or both are missng!'
    })

  }
  const newPerson = {
    name: person.name,
    number: person.number,
    id: generatedId(),
  }
  persons = persons.concat(newPerson)
  response.json(newPerson)
  

})

//delete
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})