import React  from 'react'
import Form   from './Form'
import Output from './Output'

var NeuralComponent = React.createClass({

    getInitialState: function(){
        return {
            currentInput: [],
            currentOutput: []
        }
    },

    componentWillMount: function(){
        // Create network
    },

    componentWillUpdate: function(){
        // Train network
    },

    changeCurrentInput: function(input){
        this.setState({
            currentInput: input
        })
    },

    correctCurrentOutput: function(correctReply){
        console.log('New training pattern:', this.state.currentInput, correctReply)
    },

    render: function(){

        return (
            <div>
                <Form onChange={this.changeCurrentInput} />
                <Output output={[Math.random(), Math.random(), Math.random(), Math.random()]} correction={this.correctCurrentOutput}/>
            </div>
        )
    }

})

export default NeuralComponent
