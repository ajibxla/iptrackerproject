import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Map from "./components/Map";
import testData from "./testData";
import countryListAlpha2 from "./components/CountryCode";

function App() {
  const [apidata, setApiData] = useState({});
  const [ipAddress, setIpAddress] = useState("");
  const [input, setInput] = useState("");

  const url = `
  https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_ykJJA6R5aRBJFmKhCB8Vl5lpJ1wjR&ipAddress=${ipAddress}`;
  function getData() {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }

  useEffect(() => {
    getData();
  }, [ipAddress]);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  // const validateIp = function ValidateIPaddress(ipaddress) {
  //   if (
  //     /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
  //       ipAddress,
  //     )
  //   ) {
  //     return true;
  //   }
  //   {
  //     return false;
  //   }
  // };

  const validateIp = function ValidateIPaddress(ipaddress) {
    if (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        ipaddress,
      )
    ) {
      return true;
    }
    // alert("You have entered an invalid IP address!");
    return false;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIpAddress(input);
    validateIp(ipAddress);
  };

  const position = [apidata?.location?.lat, apidata?.location?.lng];
  const location = position[0] && position[1] ? position : [26.4837, 117.925];

  return (
    <div className="App">
      <main>
        <article className="banner">
          <h1>IP Address Tracker</h1>
          <div className="form-output">
            <form action="#">
              <input type="text" onChange={handleChange} />
              <button type="submit" onClick={handleSubmit}>
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
                  <path
                    fill="none"
                    stroke="#FFF"
                    strokeWidth="3"
                    d="M2 1l6 6-6 6"
                  />
                </svg>
              </button>
            </form>
            {
              <div className="output">
                {!validateIp(ipAddress) && ipAddress !== " " ? (
                  <>
                    <p className="error-message">
                      Input field for IP address is empty. Kindly Provide a
                      valid IP Address to trach IP address. Here is your current
                      IP address: {apidata.ip}
                    </p>
                  </>
                ) : (
                  <div className="output-container">
                    <div className="address">
                      <div className="title-container">
                        <p>IP address</p>
                        <h3>{apidata.ip}</h3>
                      </div>
                      <div className="line"></div>
                    </div>
                    <div className="location">
                      <div className="title-container">
                        <p>Location</p>
                        <h3>{`${apidata?.location?.region}`}</h3>
                      </div>
                      <div className="line"></div>
                    </div>
                    <div className="timezone">
                      <div className="title-container">
                        <p>Time zone</p>
                        <h3>{`UTC ${apidata.location?.timezone}`}</h3>
                      </div>
                      <div className="line"></div>
                    </div>
                    <div className="isp">
                      <div className="title-container">
                        <p>Isp</p>
                        <h3>{apidata.isp}</h3>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            }
          </div>
        </article>
        <div className="map">
          {!validateIp(ipAddress) && ipAddress !== " " ? (
            <p className="error-message-2"> Input a valid IP Address</p>
          ) : (
            <article id="map">{<Map location={location} />}</article>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
