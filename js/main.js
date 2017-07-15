import React           from 'react'
import ReactDOM        from 'react-dom'
import Header          from './components/Header'
import NeuralComponent from './components/NeuralReactComponent'

var launchApp = function() {

    ReactDOM.render(
        <div>

            <Header/>

            <NeuralComponent/>

        </div>,
        document.getElementById('app')
    )
}

launchApp()
