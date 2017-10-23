import React                from 'react'
import ReactDOM             from 'react-dom'
import Header               from './components/Header'
import giveBrainToComponent from './NeuralHighOrderComponent'
import WatzlawickHabits from './components/WatzlawickHabits'


var launchApp = function() {

    // use HOC
    var NeuralWatzlawickHabits = giveBrainToComponent(WatzlawickHabits)

    ReactDOM.render(
        <div>
            <Header/>
            <NeuralWatzlawickHabits/>
        </div>,
        document.getElementById('app')
    )
}


launchApp()
