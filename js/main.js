import React                from 'react'
import ReactDOM             from 'react-dom'
import NeuralComponent from './components/NeuralReactComponent'

var launchApp = function() {

    ReactDOM.render(
        <div>
            <h1>Neural React Component</h1>
            <h3>feat. Mr Pollo Watzlawick</h3>

            <NeuralComponent/>

        </div>,
        document.getElementById('app')
    )
}

launchApp()
