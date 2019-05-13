import React, {Component} from 'react';
import {connect} from 'react-redux';

/*
 * mapDispatchToProps
*/
const mapDispatchToProps = () => ({})

/*
 * mapStateToProps
*/
const mapStateToProps = state => ({
    ...state
})

class InputForm extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.props.onChange(event.target.value, this.props.doc)
    }

    componentDidMount() {
        var comp = this;
        var doc = comp.props.doc;
        doc.subscribe(function (err) {
            if (err) {
                console.log(err)
                throw err;
            }
            doc.on('load', update);
            doc.on('op', update);

            function update() {
                // `comp.props.sheet.data` is now updated. re-render component.
                comp.setState({
                    value: doc.data.title
                })
                comp.forceUpdate();
            }
        });
    }

    componentWillUnmount() {
        this.props.doc.unsubscribe();
    }


    render() {
        return (
            <div>
                <input type='text' onChange={this.handleChange} value={this.props.doc.data.title}/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);
