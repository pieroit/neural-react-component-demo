import React         from 'react'
import { Architect } from 'synaptic'
import Form          from './Form'
import Output        from './Output'
import Inspector     from './Inspector'

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
        this.brain      = new Architect.Perceptron(2, 4, 4)
        this.experience = []
    },

    componentWillUpdate: function(){
        // Train network

    },

    inputPreparation: function(input){

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

        // lr = 0.1 / n
        // epochs = 100
        // bisogna insistere sugli ultimi pattern

        // lr = 0.1 / n
        // epochs = 10000
        // impara meglio

        var component = this

        var numExperiences = this.experience.length
        var learningRate   = 0.1 / numExperiences
        var epochs         = 10000

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
