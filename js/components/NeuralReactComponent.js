import React  from 'react'
import { Architect } from 'synaptic'
import Form   from './Form'
import Output from './Output'

var NeuralComponent = React.createClass({

    getInitialState: function(){
        return {
            currentInput: {
                hour    :4,
                dayType : "work day"
            },
            currentOutput: []
        }
    },

    componentWillMount: function(){
        // Create network
        this.brain      = new Architect.Perceptron(2, 2, 4)
        this.experience = []
    },

    componentWillUpdate: function(){
        // Train network

    },

    inputPreparation: function(input){

        console.log(input)

        var scaledHour    = input["hour"] / 24.0
        var binaryDayType = input["dayType"] == "work day" ? 1.0 : 0.0

        return [ scaledHour, binaryDayType ]
    },

    changeCurrentInput: function(input){

        var inputVector = this.inputPreparation(input)
        var output = this.brain.activate(inputVector)

        this.setState({
            currentInput: input,
            currentOutput: output
        })
    },

    correctCurrentOutput: function(correctReply){
        //console.log('New training pattern:', this.state.currentInput, correctReply)

        // Save new record in training set
        var inputVector = this.inputPreparation(this.state.currentInput)
        this.experience.push({
            in  : inputVector,
            out : correctReply
        })

        // Train
        this.trainCycle()

        // Show new net output for current input
        var output = this.brain.activate(inputVector)
        this.setState({
            currentOutput: output
        })
    },

    trainCycle: function(){
        var component = this

        var numExperiences = this.experience.length
        var learningRate   = 0.1 / numExperiences
        var batchSize      = 50

        for(var i=0; i<batchSize; i++){
            this.experience.forEach(function(e){
                console.log('training for', e)
                component.brain.activate(e.in)
                component.brain.propagate(0.1, e.out)
            })
        }
    },

    render: function(){

        return (
            <div>
                <Form currentInput={this.state.currentInput} onChange={this.changeCurrentInput} />
                <Output output={this.state.currentOutput} correction={this.correctCurrentOutput}/>
            </div>
        )
    }

})

export default NeuralComponent
