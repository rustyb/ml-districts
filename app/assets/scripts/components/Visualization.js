import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import moment from 'moment'
import { SingleDatePicker } from 'react-dates';

class Visualizaiton extends Component {
  constructor (props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.state = {startDate: moment().subtract(10, 'days'), endDate: moment(), focusedInput: null};
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
      <div>
        <section className="panel">
        Choose the date to show stats from {` `}
          <SingleDatePicker
            date={this.state.startDate} // momentPropTypes.momentObj or null
            onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
            focused={this.state.focused} // PropTypes.bool
            onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
            isOutsideRange={() => false}
          />
        </section>
      
      <section className="panel">
        <header className="panel__header">
          <h1 className="panel__title">{Object.keys(this.props.districts).length} Districts loaded with an overall edit count of {numeral(this.props.districts[null][0].t).format()}</h1>
        </header>
        <div className="area">
          {districts.map((dis) => {
            return this.renderTable(dis, this.props.districts[dis])
          })}

          
        </div>
      </section>
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

export default connect(selector, dispatcher)(Visualizaiton);
