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
                <h2>It is {hour}:00 in a {dayType}</h2>
                <form onChange={this.onChange}>
                    <select id="day-input" name="dayType">
                        <option value="work day">Work day</option>
                        <option value="weekend">Weekend</option>
                    </select>
                    <input id="hour-input" type="range" min="0" max="24" name="hour" value={hour} />
                </form>
                <br/>
            </div>
        )
    }

})

export default Form
