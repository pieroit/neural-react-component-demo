import React         from 'react'
import { Architect } from 'synaptic'
import Inspector     from './components/Inspector'

function giveBrainToComponent(WrappedComponent) {
    
    return class extends React.Component {
        
        constructor(props) {
            super(props)

            // create neural net
            this.brain      = new Architect.Perceptron(2, 5, 4)
            
            // prepare experience memory
            this.experience = [1923879]

            // set initial state
            this.state = {
                'prediction': [0,0,0,0]
            }
        }

        learn(input, desiredOutput) {

            console.log(this)
            
            // store new experience in memory
            this.experience.push({
                in  : input,
                out : desiredOutput
            })

            // replay memory
            this.memoryReplay()

            this.predict(input)
        }

        memoryReplay() {
            
            var component = this
            var numExperiences = this.experience.length
            var learningRate   = 0.02
            var epochs         = 10000
    
            for(var e=0; e<epochs; e++){
                this.experience.forEach(function(experience) {
                    component.brain.activate(experience.in)
                    component.brain.propagate(learningRate, experience.out)
                })
            }
        }

        predict(input) {
            // pass input to the net
            var output = this.brain.activate(input)

            // trigger a render (prediction will be passed to the wrapped component via props)
            this.setState({
                'prediction': output
            })
        }

        render() {
            
            return (
                <div>
                    <WrappedComponent
                        getPrediction={this.predict}
                        learnFromExperience={this.learn}
                        prediction={this.state.prediction}
                        {...this.props /*TODO: verify this works*/}
                    />
                    <Inspector net={this.brain} />
                </div>
            )
        }
    }
}


export default giveBrainToComponent