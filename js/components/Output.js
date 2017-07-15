import React from 'react'

var Output = React.createClass({

    prepareCorrection(index){

        var correctOutput = this.props.output.map(function(o){
            return 0.0
        })
        correctOutput[index] = 1.0

        this.props.correction(correctOutput)
    },

    render: function(){

        var component = this

        var imagesJSX = this.props.output.map(function(o, index){
            var width = 20 + (100 * o)
            return (
                <span className="outputCell">
                    <img src="img/pollo.png" width={width} onClick={component.prepareCorrection.bind(component, index)}/>
                </span>
            )
        })

        return (
            <div>
                {imagesJSX}
            </div>
        )
    }

})

export default Output
