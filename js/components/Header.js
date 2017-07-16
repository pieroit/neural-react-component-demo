import React from 'react'

var Header = React.createClass({

    render: function(){

        return (
            <div>
                <span id="logo">
                    <a href="https://www.youtube.com/channel/UCD-HLhRV_4Z3sYGkgqAnIJw">
                        <img src="img/pollo.png" width="100" />
                    </a>
                </span>
                <span id="title">
                    <h1>Neural React Component</h1>
                    <h3>feat. Mr Pollo Watzlawick</h3>
                </span>
            </div>
        )
    }

})

export default Header
