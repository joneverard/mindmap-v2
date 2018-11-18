import React, { Component } from "react";
import { connect } from "react-redux";
import { ClipLoader } from "react-spinners";
import { css } from "react-emotion";
import * as actions from "../actions";
// import './style/App.css';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import Ribbon from "./ribbon";
import MindMap from "../containers/mindmap";
import Header from "./Header";
import SideMenu from "../containers/SideMenu";
import Benefits from "./Benefits";

import QuickStart from "./QuickStart";
import { throttle } from "../utilities";

import signinSrcSmall from "../assets/google_sign_in_small.png";
import signinSrcBig from "../assets/google_sign_in.png";
// this is where to build the app...

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 250,
      height: 250,
      quickStart: false,
      loadingApp: true,
      loadingMap: true
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.saveState = throttle(e => {
      this.props.saveMap(
        this.props.Nodes,
        this.props.Connections,
        this.props.header.active
      );
    }, 2000);
  }

  componentDidMount() {
    this.setState({ loadingApp: true });
    this.props.fetchUser().then(res => {
      if (res.data.visits < 1) {
        this.setState({ quickStart: true });
        console.log("changed quickStart to true.");
        this.setState({ loadingApp: false });
      }
    });

    window.addEventListener("resize", this.updateWindowDimensions);
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("click", this.saveState);
    window.addEventListener("keypress", this.saveState);
  }

  componentWillUnmount() {
    window.removeEventListener("click");
    window.removeEventListener("keypress");
  }

  setLoading(section, status) {
    if (section === "loadingApp") {
      this.setState({ loadingApp: status });
    } else if (section === "loadingMap") {
      this.setState({ loadingMap: status });
    }
  }

  // saveState(e) {
  // 	let timeoutId;
  // 	if (timeoutId) clearTimeout(timeoutId);
  // 	timeoutId = setTimeout(() => {
  // 		console.log('do stuff here.')
  // 	}, 5000);
  // }

  updateWindowDimensions() {
    // this is where this functionality belongs. the window prop should be passed down to the components that need it.
    // instead of having this same function defined about 7 times separately in so many different components.
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  renderApp() {
    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;
    // if (!this.state.loadingMap) {
      if (this.props.header.active) {
        return [
          <Ribbon key={1} window={this.state} />,
          <MindMap key={2} loading={this.state.loadingMap} />
        ];
      } else {
        return (
          <div className="app-landing">
            <div className="sweet-loading">
              <ClipLoader
                className={override}
                sizeUnit={"px"}
                size={150}
                color={"#f39c12"}
                loading={true}
              />
            </div>
          </div>
        );
      }
    // } else {
      // return spinner
      // 	  const override = css`
      //     display: block;
      //     margin: 0 auto;
      //     border-color: red;
      // `;
    }
    // if (this.props.header.active && !this.state.loadingMap) {
    //   console.log(this.props.header.active);
    //   return [<Ribbon key={1} window={this.state} />, <MindMap key={2} loading={this.state.loadingMap} />];
    // } else {
    //   return (
    //     <div className="app-landing">
    //       Something went wrong. Please try again later.
    //     </div>
    //   );
    // }

  renderMain() {
    // should include different buttons for differing log ins.

    // need to return something other than user / false. there is a third case, if we are waiting for
    // the server to return with a response.
    // need some sort of spinner here.
    switch (this.props.user) {
      case false:
        // need to bring in the benefits component here. to be displayed above the log in button.
        return (
          <div className="app-landing">
            <Benefits />
            <a href="/auth/google" className="login-btn">
              <img
                src={this.state.width > 1000 ? signinSrcBig : signinSrcSmall}
                alt="google sign in"
              />
            </a>
          </div>
        );
      default:
        return this.renderApp();
    }
  }

  render() {
    // need to include a catch for mobile devices. avoid the bad UX of a horribly broken app.
    // needs LOTS of attention to be fixed.
    return (
      <div
        className="App"
        style={{ width: this.state.width, height: this.state.height }}
      >
        <BrowserView device={isBrowser} viewClassName="full-height full-width">
          <Header user={this.props.user} desktop />
          <SideMenu
            display={this.props.user && this.props.header.sideMenu}
            setLoading={this.setLoading}
          />
          <QuickStart skip={() => this.setState({ quickStart: false })} show={this.state.quickStart}/>
          {!this.state.quickStart ? this.renderMain() : null }
        </BrowserView>
        <MobileView device={isMobile}>
          <Header user={this.props.user} mobile />
          <div className="app-landing">
            Welcome to NoteMaps! Please access this app on a desktop to
            continue. Our mobile version is coming soon.
          </div>
        </MobileView>
      </div>
    );
  }
}

function mapStateToProps({ Nodes, Connections, user, header }) {
  return { Nodes, Connections, user, header };
}

export default connect(
  mapStateToProps,
  actions
)(App);
//{!this.state.quickStart ? <SideMenu display={this.props.user && this.props.header.sideMenu}/> : null}
