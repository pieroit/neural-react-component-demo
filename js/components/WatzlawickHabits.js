import React         from 'react'
import { Architect } from 'synaptic'
import Form          from './Form'
import Output        from './Output'

class WatzlawickHabits extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            currentInput: {
                hour    : 4,
                dayType : "work day"
            }
        }
    }

    inputPreparation = (input) => {

        var scaledHour    = input["hour"] / 24.0
        var binaryDayType = input["dayType"] == "work day" ? 0.0 : 1.0

        return [ scaledHour, binaryDayType ]
    }

    changeCurrentInput = (input) => {

        var inputVector = this.inputPreparation(input)
        //var output = this.brain.activate(inputVector) TOD TODO TODO

        this.setState({
            currentInput: input
        })
    }

    correctCurrentOutput = (correctReply) => {
        console.log(this)
        var inputVector = this.inputPreparation(this.state.currentInput)

        this.props.learnFromExperience(inputVector, correctReply) 
    }

    render(){

        return (
            <div id="neural-component">
                <Form currentInput={this.state.currentInput} onChange={this.changeCurrentInput} />
                <Output output={this.props.prediction} correction={this.correctCurrentOutput}/>
            </div>
        )
    }

}

export default WatzlawickHabits
