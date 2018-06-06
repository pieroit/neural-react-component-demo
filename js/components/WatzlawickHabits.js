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
     
    inputPreparation(input) {

        var scaledHour    = input["hour"] / 24.0
        var binaryDayType = input["dayType"] == "work day" ? 0.0 : 1.0

        return [ scaledHour, binaryDayType ]
    }

    changeCurrentInput(input) {

        var inputVector = this.inputPreparation(input)
        var output      = this.props.getPrediction(inputVector)

        this.setState({
            currentInput: input
        })
    }

    correctCurrentOutput(correctReply) {
        
        var inputVector = this.inputPreparation(this.state.currentInput)
        this.props.learnFromExperience(inputVector, correctReply) 
    }

    render(){

        return (
            <div id="neural-component">
                <Form currentInput={this.state.currentInput} onChange={this.changeCurrentInput.bind(this)} />
                <Output output={this.props.prediction} correction={this.correctCurrentOutput.bind(this)}/>
            </div>
        )
    }

}

export default WatzlawickHabits
