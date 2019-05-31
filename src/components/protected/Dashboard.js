import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import uuidv4 from 'uuid/v4'
import {
  getAirdrops,
  saveNewAirdrop
} from '../../database/airdropHomepage';

export default class Dashboard extends Component {

  state = {
    'rawAirdrops':null,
    'airdrops': null
  }

  componentDidMount() {
    this._loadAirdropData();
  }

  _loadAirdropData() {
    getAirdrops().then((successMessage) => {
        //console.log('LOAD FROM DB: ', successMessage)
        
        let airdrops = [];

        Object.keys(successMessage).map((item, i) => (
            airdrops.push(successMessage[item])
        ));

        this.setState({
            rawAirdrops: successMessage,
            airdrops: airdrops
        })

        if (this.state.airdrops.length) {
            //console.log('raw', this.state.rawAirdrops)
            //console.log(this.state.airdrops)
        }
        
    });
  }

  _addNewAirdrop = (e) => {
    e.preventDefault();
    //console.log(this.name.value)

    saveNewAirdrop(
        uuidv4(),
        this.name.value
    ).then(()=> {
        this._loadAirdropData();
    }).catch(e => console.error(e))

  }

  handleSubmit = (e) => {
    e.preventDefault()
    this._addNewAirdrop(e)
  }

  render () {
    let id = uuidv4();

    const { airdrops } = this.state

    return (
      <div>
        <div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <input className="form-control" ref={(name) => this.name = name} placeholder="Name"/>
              <button className="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
        <div>
          {airdrops && airdrops.length > 0 ? airdrops.map((item, i) => (
            <div key={uuidv4()}>
              <Link to={(`/airdrop-detail/${item.airdrop_id}`)} className="navbar-brand">{item.airdrop_name}</Link>
            </div>
          )) : <p>None</p>}
        </div>
      </div>
    )
  }
}