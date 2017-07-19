import React         from 'react'
import { Architect } from 'synaptic'
import Form          from './Form'
import Output        from './Output'
import Inspector     from './Inspector'

var NeuralComponent = React.createClass({

    getInitialState: function(){
        return {
            currentInput: {
                hour    : 4,
                dayType : "work day"
            },
            currentOutput: [0.5, 0.5, 0.5, 0.5]
        }
    },

    componentWillMount: function(){
        // Create network
        this.brain      = new Architect.Perceptron(2, 5, 4)
        this.experience = []
    },

    inputPreparation: function(input){

        var scaledHour    = input["hour"] / 24.0
        var binaryDayType = input["dayType"] == "work day" ? 0.0 : 1.0

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
                <Output output={this.state.currentOutput} correction={this.correctCurrentOutput}/>
                <Inspector net={this.brain} />
            </div>
        )
    }

})

export default NeuralComponent
