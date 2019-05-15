import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import './App.css';

import connection from './sharedb/connection'
import Sheet from "./components/Sheet";

import {socketAction} from './actions/socketAction'
/* 
 * mapDispatchToProps
*/
const mapDispatchToProps = dispatch => ({
    socketAction: () => dispatch(socketAction())
})

/* 
 * mapStateToProps
*/
const mapStateToProps = state => ({
    ...state
})

/**
 * @class App
 * @extends {Component}
 */
class App extends Component {

    state = {
        sheets: [],
        query: {}
    }

    constructor(props) {
        super(props);

        this.addNewTest = this.addNewTest.bind(this);
    }


    componentDidMount() {
        var comp = this;
        var query = connection.createSubscribeQuery('sheets', {$sort: {order: -1}});
        query.on('ready', update);
        query.on('changed', update);
        query.on('insert', update);
        query.on('remove', update);

        function update() {
            comp.setState({sheets: query.results, query: query});
            comp.props.socketAction()
        }
    }

    componentWillUnmount() {
        this.state.query.destroy();
    }

    handlePlayerSelected = (id) => {
        this.setState({selectedPlayerId: id});
    }

    handleChange = (title, sheet) => {
        let op = [{p: ['title'], od: sheet.data.title, oi: title}]
        connection.get('sheets', sheet.id).submitOp(op, {
            source: false
        }, function (err) {
            if (err) {
                return;
            }
        });
    }

    addNewTest = () => {
        let maxDocs = _.maxBy(this.state.sheets, 'data.order') || 0;

        let newId = "1";
        let newOrder = 1;
        if (maxDocs) {
            newId = "" + (parseInt(maxDocs.data.order) + 1);
            newOrder = (parseInt(maxDocs.data.order) + 1);
        }
        connection.get('sheets', newId).create({
            title: 'Test' + newId,
            order: newOrder,
            bienmoi: 'gia tri mac dinh'
        });
    }

    onRemove = (sheet) => {
        connection.get('sheets', sheet.id).del()
    }

    render() {
        return (
            <div>
                <h1>Input sheet</h1>

                <div className="sheetInput">
                    <Sheet {...this.state} onRemove={this.onRemove} onPlayerSelected={this.handlePlayerSelected}
                           onChange={this.handleChange}/>
                    <button onClick={this.addNewTest}>Test</button>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
