import React from 'react'

var Form = React.createClass({

    onChange: function(e){
        var name  = e.target.name
        var value = e.target.value

        var formValues = Object.assign({}, this.props.currentInput)
        formValues[name] = value

        this.props.onChange(formValues)
    },

    render: function(){

        var hour    = this.props.currentInput.hour
        var dayType = this.props.currentInput.dayType

        return (
            <div>
                <form onChange={this.onChange}>
                    <input type="range" min="0" max="24" name="hour" value={hour} />
                    <select name="dayType">
                        <option value="work day">Work day</option>
                        <option value="weekend">Weekend</option>
                    </select>
                </form>
                <h3>It is {hour}:00 in a {dayType}</h3>
            </div>
        )
    }

})

export default Form
