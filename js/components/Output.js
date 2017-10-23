import React from 'react'

class Output extends React.Component {

    prepareCorrection(index){

        var correctOutput = this.props.output.map(function(o){
            return 0.0
        })
        correctOutput[index] = 1.0

        this.props.correction(correctOutput)
    }

    render(){

        var component = this

        var imagesSrc = [
            "img/bed.png",
            "img/working.png",
            "img/pizza.png",
            "img/party.png",
        ]

        var imagesJSX = this.props.output.map(function(o, index){
            var width = 50 + (100 * o)
            return (
                <span className="output-cell">
                    <img src={imagesSrc[index]} width={width} onClick={component.prepareCorrection.bind(component, index)}/>
                </span>
            )
        })

        return (
            <div id="output-cells">
                {imagesJSX}
            </div>
        )
    }

}

export default Output
