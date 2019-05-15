import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
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
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.props.onChange(event.target.value, this.props.doc)
    }

    handleRemove() {
        this.props.onRemove(this.props.doc)
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
            doc.on('create', update);
            doc.on('del', update);

            function update() {
                // `comp.props.sheet.data` is now updated. re-render component.
                comp.forceUpdate();
            }
        });
    }

    componentWillUnmount() {
        this.props.doc.unsubscribe();
    }


    render() {

        let {doc} = this.props;

        let content = ''
        if(!_.isUndefined(doc) && !_.isUndefined(doc.data) && !_.isUndefined(doc.data.title)){
            content = doc.data.title
        }

        return (
            <div>
                <input type='text' onChange={this.handleChange} value={content}/>
                <button onClick={this.handleRemove}>Remove</button>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);
