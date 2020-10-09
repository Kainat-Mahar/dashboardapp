import React, { Component } from 'react';
import './dashboard.css';
import {Col,Row,Container} from 'react-bootstrap';
import WidgetText from './WidgetText';
import WidgetBar from './WidgetBar';
import WidgetDoughnut from './WidgetDoughnut';
import WidgetMultiarea  from './WidgetMultiarea';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WidgetAverage from './WidgetAverage'



//excel import
const config = {
    apiKey: 'AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI',
    spreadsheetId: '1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg'
}
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId
    }/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;
    

class Dashboard extends Component {

    constructor(){
        super();
        this.state = {
          items:[],
          dropdownOptions:[],
          selectedValue:null,
          organicSource:null,
          directSource:null,
          referralSource:null,
          pageViews:null,
          users:null,
          newUsers:null,
          sessionPeruser:null,
          bounceRate:null,
          perSession:null,
          avgSession:null,
          sourceArr:[],
          usersArr:[],
          sessionArr:[],
          averageArr:[],
        }
    }
    getData = arg => {
        const arr = this.state.items;
        const arrLen = arr.length;

        let organicSource = 0;
        let directSource = 0;
        let referralSource = 0;
        let pageViews = 0;
        let users = 0;
        let newUsers = 0;
        let sessionPeruser = 0;
        let bounceRate = 0;
        let perSession = 0;
        let avgSession = 0;
        let selectedValue = null;
        let sourceArr = [];
        let usersArr = [];
        let sessionArr = [];
        let averageArr = [];

        for(let i = 0; i<arrLen;i++){
          if(arg == arr[i]["month"]){
            organicSource = arr[i].organic_source;
            directSource = arr[i].direct_source;
            referralSource = arr[i].referral_source;
            pageViews = arr[i].page_views;
            users = arr[i].users;
            newUsers = arr[i].new_users;
            sessionPeruser = arr[i].number_of_sessions_per_users;
            bounceRate = arr[i].bounce_rate;
            perSession = arr[i].page_per_session;
            avgSession = arr[i].avg_session_time;
            sourceArr.push(
              {
                label: "Organi Source",
                value: arr[i].organic_source
              },
              {
                label: "Direct Source",
                value: arr[i].direct_source
              },
              {
                label: "Referral Source",
                value: arr[i].referral_source
              }
            )
            usersArr.push(
              {
                label: "Users",
                value: arr[i].users
              },
              {
                label: "New users",
                value: arr[i].new_users
              }
            )
            sessionArr.push(
              {
                label: "Session Per User",
                value: arr[i].number_of_sessions_per_users
              },
              {
                label: "Bounce Rate",
                value: arr[i].bounce_rate,
              }
            )
            averageArr.push(
              {
                label: "Page Per Session",
                value: arr[i].page_per_session
              },
              {
                label: "Average Session Time",
                value: arr[i].avg_session_time,
              }
            )
          }
        }
        selectedValue = arg;
        this.setState({
          organicSource:organicSource,
          directSource:directSource,
          referralSource:referralSource,
          pageViews:pageViews,
          users:users,
          newUsers:newUsers,
          sourceArr:sourceArr,
          usersArr:usersArr,
          sessionPeruser:sessionPeruser,
          sessionArr:sessionArr,
          perSession:perSession,
          avgSession:avgSession,
          bounceRate:bounceRate,
          averageArr:averageArr,

        }
        // ,()=> { console.log(this.state.organicSource)}
        )
    }
    updateDashboard = event => {
        this.getData(event.value);
        this.setState({selectedValue:event.value}, ()=>{
          console.log(this.state.users)
        });
    }
    componentDidMount(){
        fetch(url)
        .then(response => response.json())
        .then(data => {

                let batchRowValues = data.valueRanges[0].values;

                const rows = [];

                for (let i = 1; i < batchRowValues.length; i++) {
                    let rowObject = {};
                    for (let j = 0; j < batchRowValues[i].length; j++) {
                        rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
                    }
                    rows.push(rowObject);
                }
                // dropdown options
                let dropdownOptions = [];

                for (let i = 0; i < rows.length; i++) {
                    dropdownOptions.push(rows[i].month);
                }

                dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
                this.setState(
                    {
                        items: rows,
                        dropdownOptions: dropdownOptions,
                        selectedValue: "Jan 2018"
                    },
                    () => this.getData("Jan 2018")
                );
        });
    }
    render() {
        // Preparing the chart data

        return (
            <div>
              <Container fluid>
                <Row className="TopHeader">
                  <Col>
                  Dashboard
                  </Col>
                  <Col></Col>
                  <Col>
                    <Dropdown options={this.state.dropdownOptions} onChange={this.updateDashboard} value={this.state.selectedValue} placeholder="Select an option" />
                  </Col>
                </Row>
              </Container>
              <Container className="mainDashboard">
                <Row>
                <Col>
                  <WidgetText title="Organic Source" value={this.state.organicSource}/>
                  </Col>
                  <Col>
                  <WidgetText title="Dirct Source" value={this.state.directSource}/>
                  </Col>
                </Row>
                <Row>
               
                  <Col>
                  <WidgetText title="Referral Source" value={this.state.referralSource}/>
                  </Col>
                  <Col>
                  <WidgetText title="Page Views" value={this.state.pageViews}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <WidgetBar title="Source Comparison" data={this.state.sourceArr}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <WidgetText title="Users" value={this.state.users}/>
                  </Col>
                  <Col>
                  <WidgetText title="New Users" value={this.state.newUsers}/>
                  </Col>
                  </Row>
                <Row>
                  <Col>
                  <WidgetDoughnut title="Source Comparison" data={this.state.usersArr}/>
                  </Col>
                  <Col>
                  <WidgetMultiarea title="Session Per User" data={this.state.sessionArr}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <WidgetAverage title="Average" data={this.state.averageArr}/>
                  </Col>
                </Row>
                </Container>
                {/* <WidgetDoughnut title="Title" data={chartData}/> */}

              {/* <WigetText title="Title" value={140} description="Some text"/> */}
            </div>
        )
    }
}

export default Dashboard
