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
            //this.brain = new Architect.Perceptron(2, 5, 4)
            this.brain = tf.sequential()
            this.brain.add(tf.layers.leakyReLU( {units: 5, inputShape: [2]} ) )
            this.brain.add(tf.layers.softmax( {units: 4} ) )
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

            this.predict(input)
        }

        async memoryReplay() {
            
            var component = this
            var numExperiences = this.experience.length
            var learningRate   = 0.05
            var epochs         = 2000

            // convert experience to tensors
            let xTensor = []
            let yTensor = []
            this.experience.forEach(function(exp){
                xTensor.push(exp.in)
                yTensor.push(exp.out)
            })
            xTensor= tf.tensor(xTensor)
            yTensor= tf.tensor(yTensor)

            // train the net
            await this.brain.fit(xTensor, yTensor)

        }

        predict(input) {

            // pass input to the net
            var inputTensor = tf.tensor( [input] )
            var output      = this.brain.predict(inputTensor).dataSync()

            // trigger a render (prediction will be passed to the wrapped component via props)
            this.setState({
                'prediction': output
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
                    <Inspector net={this.brain} />
                </div>
            )
        }
    }
}


export default giveBrainToComponent
