import React, {Component} from 'react';
import {connect} from 'react-redux';
import InputForm from "./InputForm";
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

class Sheet extends Component {

    handleChange = (text, sheet) => {
        this.props.onChange(text, sheet)
    }
    handleRemove = (sheet) => {
        this.props.onRemove(sheet)
    }

    render() {
        var { sheets } = this.props;

        var other = _.omit(this.props, 'sheets', 'query'); //Remove sheets on props

        var InputSheet = sheets.map((value) => {
            return (
                <InputForm {...other} doc={value} key={value.id} onChange={this.handleChange} onRemove={this.handleRemove}/>
            )
        });
        return (
            <div className={"input"}>
                {InputSheet}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sheet);
