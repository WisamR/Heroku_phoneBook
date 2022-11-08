import React from 'react'
import axios from 'axios'
const baseUrl = '/api/persons'
//'/api/persons'

/*const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}*/
const Note = ({ j, k }) => {
    return (
        <div>
            {j.name}  {j.number} <button onClick={() => k(j.id)}> Delete</button>
        </div>
    )
}
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [{
                name: ''
            }],
            newPerson: '',
            newNumber: ''
        }
    }

    componentDidMount() {

        axios
            .get(baseUrl)
            .then(response => {
                console.log('promise fulfilled')
                this.setState({ persons: response.data })
            })
    }
    addName = (event) => {
        event.preventDefault()
        const personObject = {
            name: this.state.newPerson,
            id: this.state.persons.length + 1,
            number: this.state.newNumber

        }

        axios
            .post(baseUrl, personObject)
            .then(response => {
                this.setState({
                    persons: this.state.persons.concat(response.data),
                    newPerson: ' '
                })
            })

        const persons = this.state.persons.concat(personObject)
        this.setState({
            persons,
            newPerson: ''
        })


    }

    deleteName = (id) => {

        axios
            .delete(`${baseUrl}/${id}`)
            .then(response => {
                this.setState({
                    persons: this.state.persons.filter(key => key.id !== id)
                })

            })

        window.alert(`You are going to delete this person name and number!`)

    }


    addNumber = (event) => {
        event.preventDefault()

    }

    handleNameCh = (event) => {
        this.setState({ newPerson: event.target.value })
    }

    handleNum = (event) => {
        this.setState({ newNumber: event.target.value })
    }
    render() {
        return (

            <div>
                <h2>phone book</h2>
                <form onSubmit={this.addName}>
                    <div>nimi:  <input value={this.state.newPerson}
                        onChange={this.handleNameCh} />
                        <form onSubmit={this.addNumber}>
                        </form>
                        <div>  numero: <input value={this.state.newNumber}
                            onChange={this.handleNum} />
                        </div>

                    </div>
                    <div>
                        <button type="submit">add</button>

                    </div>
                </form>
                <h2>Numerot</h2>
                <div> {this.state.persons.map(i => <Note key={i.id} k={this.deleteName} j={i}  />)} </div>
                

            </div>
        )
    }
}


export default App

