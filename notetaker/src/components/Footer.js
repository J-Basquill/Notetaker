import React, { Component } from 'react';

const footerStyles = {
  color: "#8ba0a6",
  textAlign: "center"
}

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = { year: new Date().getFullYear() };
    }

    render() {
        return (
            <footer style={footerStyles}>
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
