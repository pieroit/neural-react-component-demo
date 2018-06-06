import React from 'react'

class Form extends React.Component {

    onChange(e){

        var name  = e.target.name
        var value = e.target.value

        var formValues = Object.assign({}, this.props.currentInput)
        formValues[name] = value

        // notify parent of form change
        this.props.onChange(formValues)
    }

    render(){

        var hour    = this.props.currentInput.hour
        var dayType = this.props.currentInput.dayType

        return (
            <div>
                <h2>It is {hour}:00 in a {dayType}</h2>
                <form onChange={this.onChange.bind(this)}>
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

}

export default Form
