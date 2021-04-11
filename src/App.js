import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import LaunchDetails from "./components/LaunchDetails";
import querystring from "querystring";
import "./App.css";
const API_BASE_URL = "https://api.spaceXdata.com/v3/launches?";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      filters: {
        limit: 100,

        launch_success: undefined,
        land_success: undefined,
        launch_year: undefined,
      },
    };
  }

  getUpdatedApiUrl(filters = {}) {
    console.log(filters);
    for (let x in filters) {
      if (filters[x] === undefined || filters[x] === null) {
        delete filters[x];
      }
    }
    return API_BASE_URL + querystring.stringify({ ...filters });
  }

  fetchAPI(filters) {
    const URL = this.getUpdatedApiUrl(filters);
    this.setState({ isLoaded: false, filters });
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          isLoaded: true,
          data,
        });
        console.log("data", data);
      });
  }

  componentDidMount() {
    this.fetchAPI(this.state.filters);
  }

  updateApiFilters(type, value) {
    // if same value is clicked, we remove that filter
    if (this.state.filters[type] === value) {
      value = undefined;
    }

    const filters = {
      ...this.state.filters,
      [type]: value,
    };

    this.fetchAPI(filters);
  }

  render() {
    const { isLoaded, data } = this.state;

    if (!isLoaded) {
      return (
        <div className="App-loader-container">
          <div className="App-loader-box">
            <h3>Please Wait</h3>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1 className="App-header">SpaceX Launch Programs</h1>
          <Container fluid>
            <Row>
              <Col xs={12} sm={12} md={6} lg={3}>
                <Card className="App-filter-card">
                  <Card.Body>
                    <Card.Title className="App-filter-header">
                      Filters
                    </Card.Title>

                    <Card.Text className="App-filter-heading">
                      Successful Launch
                      <hr className="App-filters-hr" />
                    </Card.Text>

                    <div className="App-filter-button-container">
                      <Button
                        className="App-filter-button"
                        variant={
                          this.state.filters.launch_success === "true"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateApiFilters(
                            "launch_success",
                            e.target.value
                          )
                        }
                        value="true"
                      >
                        True
                      </Button>

                      <Button
                        className="App-filter-button"
                        variant={
                          this.state.filters.launch_success === "false"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateApiFilters(
                            "launch_success",
                            e.target.value
                          )
                        }
                        value="false"
                      >
                        False
                      </Button>
                    </div>

                    <Card.Text className="App-filter-heading">
                      Successful Landing
                      <hr className="App-filters-hr" />
                    </Card.Text>
                    <div className="App-filter-button-container">
                      <Button
                        className="App-filter-button"
                        variant={
                          this.state.filters.land_success === "true"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateApiFilters("land_success", e.target.value)
                        }
                        value="true"
                      >
                        True
                      </Button>

                      <Button
                        className="App-filter-button"
                        variant={
                          this.state.filters.land_success === "false"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateApiFilters("land_success", e.target.value)
                        }
                        value="false"
                      >
                        False
                      </Button>
                    </div>
                  </Card.Body>
                  <Button
                    className="App-filter-button"
                    variant={
                      this.state.filters.launch_year === "2014"
                        ? "success"
                        : "outline-success"
                    }
                    onClick={(e) =>
                      this.updateApiFilters("launch_year", e.target.value)
                    }
                    value="2014"
                  >
                    All
                  </Button>
                </Card>
              </Col>

              <Col xs={12} sm={12} md={6} lg={9}>
                <Row>
                  {data.map((details) => {
                    return (
                      <Col md={6} sm={12} lg={3}>
                        <LaunchDetails details={details} />
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}

export default App;
