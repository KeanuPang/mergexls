import React, {Component} from 'react'
import {render} from 'react-dom'
import {} from './css/global.css'
import Logo from './components/Logo.js'
import Link from './components/Link.js'

const logos = [
    require('./assets/electron.png'),
    require('./assets/react.png'),
    require('./assets/webpack.png')
];

export default class App extends Component {
    render() {
        const logosRender = logos.map((logo, index) => {
            return <Logo key={index} src={logo}/>
        });

        return (
            <div>
                {logosRender}

                <div className="hello">
                    <h1>Hello World</h1>
                </div>

                <p>
                    Download <Link to='http://electron.atom.io/docs/'>Electron</Link> first.
                </p>
            </div>
        )
    }
}
