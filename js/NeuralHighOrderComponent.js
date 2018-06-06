import React         from 'react'
import * as tf       from '@tensorflow/tfjs'
import Inspector     from './components/Inspector'

function giveBrainToComponent(WrappedComponent) {
    
    return class extends React.Component {
        
        constructor(props) {
            super(props)

            // create neural net
            this.newBrain()
            
            // prepare experience memory
            this.experience = []

            // set initial state
            this.state = {
                'prediction': [0,0,0,0]
            }
        }

        newBrain() {
            // feed-forward classifier neural net with shape 2 -> 5 -> 4
            this.brain = tf.sequential()
            this.brain.add(tf.layers.leakyReLU( {units: 5, inputShape: [2]} ) )
            this.brain.add(tf.layers.dense( {units: 4, activation:'softmax'} ) )
            this.brain.compile({optimizer: 'sgd', loss: 'meanSquaredError'})
        }

        learn(input, desiredOutput) {
            
            // store new experience in memory
            this.experience.push({
                in  : input,
                out : desiredOutput
            })

            // recreate net from scratch
            this.newBrain()

            // replay memory
            this.memoryReplay()

            //this.predict(input)
        }

        predict(input, returnResult=false) {
            // pass input to the net
            let inputTensor      = tf.tensor( [input] )
            let outputTypedArray = this.brain.predict(inputTensor).dataSync()
            let output           = Array.from(outputTypedArray)
            
            if(returnResult) {
                return output
            } else {
                // trigger a render (prediction will be passed to the wrapped component via props)
                this.setState({
                    'prediction': output
                })
            }
        }

        memoryReplay() {
            
            let component = this

            // convert experience to tensors
            let xTensor   = []
            let yTensor   = []
            let lastInput = undefined
            this.experience.forEach(function(exp){
                xTensor.push(exp.in)
                yTensor.push(exp.out)
                lastInput = exp.in
            })
            xTensor= tf.tensor(xTensor)
            yTensor= tf.tensor(yTensor)

            // train the net
            let trainingOptions = {
                epochs: 100,
                batchSize: 1,
            }
            this.brain.fit(xTensor, yTensor, trainingOptions).then(function(s){
                console.log(s, 'finish training')
                component.predict(lastInput)
            })

        }

        render() {
            return (
                <div>
                    <WrappedComponent
                        getPrediction={this.predict.bind(this)}
                        learnFromExperience={this.learn.bind(this)}
                        prediction={this.state.prediction}
                        {...this.props}
                    />
                    <Inspector net={this.brain} predict={this.predict.bind(this)} />
                </div>
            )
        }
    }
}


export default giveBrainToComponent
