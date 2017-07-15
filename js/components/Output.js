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
            var width = 100 * o
            return (
                <img src="img/grandma.jpg" width={width} onClick={component.prepareCorrection.bind(component, index)}/>
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
