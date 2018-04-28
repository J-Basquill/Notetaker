import React, { Component } from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = { year: new Date().getFullYear() };
    }

    render() {
        return (
            <footer >
                <ul className="text-white">
                    <li>
                        &copy; {this.state.year} NoteTaker
                    </li>
                </ul>
            </footer>
        );
    }
}

export default Footer;
