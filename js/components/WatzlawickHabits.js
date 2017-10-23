import React         from 'react'
import { Architect } from 'synaptic'
import Form          from './Form'
import Output        from './Output'

var WatzlawickHabits = React.createClass({

    getInitialState: function(){
        return {
            currentInput: {
                hour    : 4,
                dayType : "work day"
            },
            currentOutput: [0.5, 0.5, 0.5, 0.5]
        }
    },

    inputPreparation: function(input){

        var scaledHour    = input["hour"] / 24.0
        var binaryDayType = input["dayType"] == "work day" ? 0.0 : 1.0

        return [ scaledHour, binaryDayType ]
    },

    changeCurrentInput: function(input){

        var inputVector = this.inputPreparation(input)
        //var output = this.brain.activate(inputVector)

        this.setState({
            currentInput: input,
            currentOutput: output
        })
    },

    correctCurrentOutput: function(correctReply){
        
        var inputVector = this.inputPreparation(this.state.currentInput)

        this.props.learnFromExperience(inputVector, correctReply) 
    },

    trainCycle: function(){

        var component = this

        var numExperiences = this.experience.length
        var learningRate   = 0.02// / numExperiences
        var epochs         = 50000

        for(var i=0; i<epochs; i++){
            this.experience.forEach(function(experience){
                component.brain.activate(experience.in)
                component.brain.propagate(learningRate, experience.out)
            })
        }
    },

    render: function(){

        return (
            <div id="neural-component">
                <Form currentInput={this.state.currentInput} onChange={this.changeCurrentInput} />
                <Output output={this.props.prediction} correction={this.correctCurrentOutput}/>
            </div>
        )
    }

})

export default WatzlawickHabits
