import React from 'react'
import { VictoryScatter, VictoryAxis, VictoryChart } from 'victory'

var Inspector = React.createClass({

    sampleResponseProfile: function(){

        var net = this.props.net

        var responseProfiles = [
            [],[],[],[]
        ]

        var step = 0.1
        var min  = 0
        var max  = 1
        for(var xStep=min; xStep<=max; xStep+=step){
            for(var yStep=min; yStep<=max; yStep+=step){
                var out = net.activate([xStep, yStep])
                for(var o=0; o<out.length; o++){
                    responseProfiles[o].push({
                        x: xStep,
                        y: yStep,
                        activation: out[o]
                    })
                }
            }
        }

        return responseProfiles

    },

    render: function(){

        var outputNeuronsResponseProfile = this.sampleResponseProfile()

        var responseProfileChartsJSX = outputNeuronsResponseProfile.map(function(resProfile){
            return (
                <div className="chart-container">
                    <VictoryChart height={400}>
                        <VictoryScatter

                            domain={{x:[0,1],y:[0,1]}}
                            size={function(d){
                                return d['activation'] * 10
                            }}
                            data={resProfile}
                        />
                        <VictoryAxis dependentAxis label="dayType" />
                        <VictoryAxis label="hour" />
                    </VictoryChart>
                </div>
            )
        })

        return (
            <div>
                {responseProfileChartsJSX}
            </div>
        )
    }

})

export default Inspector
