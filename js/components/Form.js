import React from 'react'

var Form = React.createClass({

    getInitialState: function(){
        return {
            hour: 0,
            dayType: "work day"
        }
    },

    onChange: function(e){
        var name  = e.target.name
        var value = e.target.value

        this.setState({
            [name]: value
        })

        this.props.onChange(this.state)
    },

    render: function(){

        return (
            <div>
                <form onChange={this.onChange}>
                    <input type="range" min="0" max="24" name="hour" value={this.state.hour} />
                    <select name="dayType">
                        <option value="work day">Work day</option>
                        <option value="weekend">Weekend</option>
                    </select>
                </form>
                <h3>It is {this.state.hour}:00 in a {this.state.dayType}</h3>
            </div>
        )
    }

})

export default Form
