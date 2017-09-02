import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import moment from 'moment'
import { SingleDatePicker } from 'react-dates';
import {
  fetchDistricts
} from '../actions/action-creators';

class Visualizaiton extends Component {
  constructor (props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.getNewStats = this.getNewStats.bind(this);
    this.state = {startDate: moment().subtract(10, 'days'), focusedInput: null};
  }

  componentDidMount () {
    this.props._fetchDistricts('2017-01-01');
  }

  getNewStats (date) {
    this.setState({ startDate: date })

    return this.props._fetchDistricts(date.format('YYYY-MM-DD'));
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.districtsFetched !== this.props.districtsFetched) {
      return this.getNewStats();
    }
  }

  renderRow (row) {
    return (
      <tr key={row.user+row.c}>
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
      <div key={district+''}>
      <h2>{`${district} (${numeral(total).format()})`}</h2>
      <table  className="table">
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
            onDateChange={date => this.getNewStats(date)} // PropTypes.func.isRequired
            focused={this.state.focused} // PropTypes.bool
            onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
            isOutsideRange={() => false}
          /> {` `} up until today.
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
    districts: state.maplesothoDistricts.districts,
    districtsFetched: state.maplesothoDistricts.fetched,
  };
};

const dispatcher = (dispatch) => {
  return {
    _fetchDistricts: (dateFrom) => dispatch(fetchDistricts(dateFrom))
  };
};

export default connect(selector, dispatcher)(Visualizaiton);
