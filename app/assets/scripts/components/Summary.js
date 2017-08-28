import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
class Summary extends Component {
  constructor (props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderTable = this.renderTable.bind(this);
  }

  renderRow (row) {
    return (
      <tr key={row.user}>
        <th>{row.user}</th>
        <td>{+row.c}</td>
        <td>{+row.m}</td>
        <td>{+row.d}</td>
        <td>{+row.t}</td>
      </tr>
      )
  }
  renderTable (district, data) {
    const rows = data.slice(1).map(row => {return this.renderRow(row)});
    const total = +data[0].t
    return (
      <div>
      <h2>{`${district} (${numeral(total).format()})`}</h2>
      <table key={district} className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Create</th>
            <th>Mod</th>
            <th>Delete</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      </div>
      )
  }

  render () {
    const districts = Object.keys(this.props.districts).slice(1);
    return (
      <div className="Selector--main">
        <div className="select--header">
          <h1>Summary</h1>
        </div>
        <div className="selector--body">
        <dl className="dl-horizontal">
          <dt>Total</dt>
          <dd>{numeral(this.props.districts[null][0].t).format()}</dd>
          {districts.map((dis) => {
            return (<div>
              <dt>{dis}</dt>
              <dd>{numeral(this.props.districts[dis][0].t).format()}</dd>
              </div>
              )
          })}
        </dl>
        </div>
      </div>
    );
  }
}

const selector = (state) => {
  return {
    districts: state.maplesothoDistricts.districts
  };
};

const dispatcher = (dispatch) => {
  return {};
};

export default connect(selector, dispatcher)(Summary);
