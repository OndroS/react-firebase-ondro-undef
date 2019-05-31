import React, { Component } from 'react'
import CSVReader from "react-csv-reader"
import uuid from "uuid/v4"
import EditableLabel from 'react-inline-editing'
import {
  getAirdropData,
  saveNewImport
} from '../../database/airdropDetail';

export default class AirdropDetail extends Component {

  constructor(props) {
    super(props); 
  }

  state = {
    'csvView': 'Upload CSV',
    'importedData': false,
    'rawAirdropData':null,
    'airdropData': null
  }

  componentDidMount() {
    this._loadAirdropData(this.props.match.params.id)
  }

  _loadAirdropData(airdropID) {
    getAirdropData(airdropID).then((successMessage) => {
        //console.log('LOAD FROM DB: ', successMessage)
        
        let airdrops = [];

        Object.keys(successMessage).map((item, i) => (
            airdrops.push(successMessage[item])
        ));

        this.setState({
          rawAirdropData: successMessage,
            airdropData: airdrops
        })

        if (this.state.airdropData.length) {
            //console.log('raw', this.state.rawAirdropData)
            console.log(this.state.airdropData)
        }
        
    });
  }

  _handleForce = (data) => {
    let importedDataObj = [];

    data.forEach(data => {
      importedDataObj.push({
        "wallet": data[0],
        "amount": data[6]
      })
    });
    this.setState({"importedData":importedDataObj})
  }

  _handleFocus(text, i) {
    console.log('Focused with text: ' + text, i);
  }

  _handleFocusOut(text, i) {
      console.log('Left editor with text: ' + text, i);
  }

  _saveImportToDB(e) {
    e.preventDefault();
    console.log(this.state.importedData)

    saveNewImport(
        this.props.match.params.id,
        JSON.stringify(this.state.importedData)
    ).then(()=> {
        this._loadAirdropData(this.props.match.params.id);
    }).catch(e => console.error(e))
  }

  render () {
    const  { csvView, importedData } = this.state;

    return (
      <div>
        Dashboard. This is a protected route. You can only see this if you're authed.

        <CSVReader
          cssClass="react-csv-input"
          label="Upload CSV file with receiver addresses and defined amounts"
          onFileLoaded={(data) => this._handleForce(data)}
        />

        <button onClick={e => this._saveImportToDB(e)}>Save import to DB</button>

        <div className="wallets">
          {importedData ? 
            importedData.map((item) => (
              <div key={uuid()}>
                <EditableLabel text={item.wallet}
                  labelClassName='myLabelClass'
                  inputClassName='myInputClass'
                  inputWidth='550px'
                  inputHeight='25px'
                  inputMaxLength='50'
                  labelFontWeight='bold'
                  inputFontWeight='bold'
                  onFocus={(e) => this._handleFocus(e)}
                  onFocusOut={(e) => this._handleFocusOut(e)}
                />
                <EditableLabel text={item.amount}
                  labelClassName='myLabelClass'
                  inputClassName='myInputClass'
                  inputWidth='100px'
                  inputHeight='25px'
                  inputMaxLength='50'
                  labelFontWeight='bold'
                  inputFontWeight='bold'
                  onFocus={(e) => this._handleFocus(e)}
                  onFocusOut={(e) => this._handleFocusOut(e)}
                />
              </div>
            )) : csvView}
        </div>

      </div>
    )
  }
}