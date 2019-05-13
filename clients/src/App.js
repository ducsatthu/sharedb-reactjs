import React, {Component} from 'react';
import {connect} from 'react-redux';

import './App.css';

import connection from './sharedb/connection'
import Sheet from "./components/Sheet";

/* 
 * mapDispatchToProps
*/
const mapDispatchToProps = dispatch => ({})

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

    componentDidMount() {
        var comp = this;
        var query = connection.createSubscribeQuery('sheets', {$sort: {_id: -1}});
        query.on('ready', update);
        query.on('changed', update);

        function update() {
            comp.setState({sheets: query.results, query: query});
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

    render() {
        return (
            <div>
                <h1>Input sheet</h1>

                <div className="sheetInput">
                    <Sheet {...this.state} onPlayerSelected={this.handlePlayerSelected} onChange={this.handleChange}/>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
