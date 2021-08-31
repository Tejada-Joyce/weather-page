import { useState } from "react";
import Forecast from "./Forecast";
import useFetch from "./useFetch";
import styled, { css } from "styled-components";
import * as React from "react";
import breakpoints from "./styles/breakpoints";
import moment from "moment";
// import images from "constants";
import humidity from "./images/humidity.png";
import visib from "./images/visibility.png";
import sunrise from "./images/sunrise.png";
import sunset from "./images/sunset.png";
import windSpeed from "./images/wind-speed.png";
import windDirection from "./images/wind-direction.png";

const Button = styled.button`
  background: #f4b942;
  border: 2px solid #f4b942;
  border-radius: 4px;
  color: white;
  margin-left: 1em;
  padding: 0.5em;
  text-align: center;

  @media only screen and ${breakpoints.device.sm} {
    margin-left: 0;
  }

  ${(props) =>
    props.primary &&
    css`
      margin: 0 auto;
      border-radius: 6px;
      display: block;
      width: 50%;

      @media only screen and ${breakpoints.device.sm} {
        margin: 0 auto;
        width: 20%;
      }
    `}
`;

const Input = styled.input`
  padding: 0.6em;
  margin: 1em;
  color: #0a58ca;
  background: #eff2f1;
  border: 0.5px solid #0a58ca;
  border-radius: 4px;
`;
const WeatherContainer = styled.div`
  text-align: center;
  background: #eff2f1;
  border: 0.5px solid #eff2f1;
  border-radius: 20px;
  margin: 10px 10%;
  padding: 40px 0;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
`;

const MainDetails = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 0 40px;
  margin: 0 auto;
  align-items: center;
  @media only screen and ${breakpoints.device.sm} {
    flex-direction: row;
    width: 400px;
  }
`;

const DetailCard = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1.6em 0.6em;
  border-radius: 20px;
  box-shadow: 0.6rem 0.4rem 1rem rgba(38, 34, 57, 0.37);
  background: #fff;
  margin-bottom: 35px;
  @media only screen and ${breakpoints.device.sm} {
    width: 250px;
  }
`;

const DetailsContainer = styled.div`
  display: grid;
  margin: 0 auto;
  grid-template-columns: 1fr;
  justify-items: center;
  @media only screen and ${breakpoints.device.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media only screen and ${breakpoints.device.sm} {
    flex-direction: row;
    justify-content: space-evenly;
    height: 100%;
  }
  @media only screen and ${breakpoints.device.lg} {
    flex-direction: column;
    justify-content: space-between;
    height: 300px;
  }
`;

const LogoImage = styled.img`
  width: 75px;
  height: 100%;
  @media only screen and ${breakpoints.device.sm} {
    width: 35%;
  }
`;

const span = {
  display: "block",
  fontSize: "1.8em",
  fontWeight: "bold",
};

function degToCompass(num) {
  var val = Math.floor(num / 45 + 0.5) % 8;
  var arr = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return arr[val];
}

function convertUTCTime(time, timezone, date) {
  let newTime;
  if (date) {
    newTime = moment
      .unix(time)
      .utcOffset(timezone / 3600)
      .format("dddd, hh:mm A");
  } else {
    newTime = moment
      .unix(time)
      .utcOffset(timezone / 3600)
      .format("hh:mm A");
  }

  return newTime;
}

const Current = () => {
  const [city, setCity] = useState("Rexburg");
  const [unit, setUnit] = useState({
    value: "imperial",
    temp: "F",
    speed: "mph",
  });
  const [button, setButton] = useState(
    "Show Forecast for the following 5 days"
  );
  const [visibility, setVisibility] = useState(false);
  const [value, setValue] = useState("");
  const appid = "ae51ee811e4a15bbb35b5a146bb03482";

  let apiCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit.value}&appid=${appid}`;

  const { weather, isPending, error } = useFetch(apiCurrent);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(value);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setVisibility(false);
    setButton("Show Forecast for the following 5 days");
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  const changeUnit = () => {
    unit.value === "imperial"
      ? setUnit({ value: "metric", temp: "C", speed: "m/s" })
      : setUnit({ value: "imperial", temp: "F", speed: "mph" });
  };

  const showComponent = () => {
    if (button === "Show Forecast for the following 5 days") {
      setButton("Hide Forecast");
      setVisibility(true);
    } else {
      setButton("Show Forecast for the following 5 days");
      setVisibility(false);
    }
  };

  return (
    <div>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {weather && (
        <div>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              required
              placeholder="City Name"
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
            />
            <Button type="submit">Search</Button>
          </form>

          <WeatherContainer>
            <h1>{weather.name + ", " + weather.sys.country}</h1>
            <p style={{ fontSize: 30 }}>
              {" "}
              {convertUTCTime(weather.dt, weather.timezone, true)}
            </p>
            <Button primary onClick={changeUnit}>
              Change Units
            </Button>
            <MainDetails>
              <div>
                <p style={{ fontSize: 70, marginBottom: "0.5rem" }}>
                  {Math.round(weather.main.temp) + "\xB0" + unit.temp}
                </p>
                <p>
                  Feels like{" "}
                  {Math.round(weather.main.feels_like) + "\xB0" + unit.temp}
                </p>
              </div>
              <div>
                <img
                  src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                  alt="weather icon"
                  style={{ width: "100px" }}
                />
                <p>{weather.weather[0].description}</p>
              </div>
            </MainDetails>
            <DetailsContainer>
              <Group>
                <DetailCard>
                  <LogoImage src={humidity} alt="Humidity Logo" />
                  <p>
                    Humidity: <span style={span}>{weather.main.humidity}%</span>
                  </p>
                </DetailCard>
                <DetailCard>
                  <LogoImage src={visib} alt="Visibility Logo" />
                  <p>
                    Visibility:{" "}
                    <span style={span}>
                      {Math.round(
                        (weather.visibility / 1000 + Number.EPSILON) * 100
                      ) / 100}{" "}
                      km
                    </span>
                  </p>
                </DetailCard>
              </Group>
              <Group>
                <DetailCard>
                  <LogoImage src={sunrise} alt="Sunrise Logo" />
                  <p>
                    Sunrise:{" "}
                    <span style={span}>
                      {convertUTCTime(
                        weather.sys.sunrise,
                        weather.timezone,
                        false
                      )}
                    </span>
                  </p>
                </DetailCard>
                <DetailCard>
                  <LogoImage src={sunset} alt="Sunset Logo" />
                  <p>
                    Sunset:{" "}
                    <span style={span}>
                      {convertUTCTime(
                        weather.sys.sunset,
                        weather.timezone,
                        false
                      )}
                    </span>
                  </p>
                </DetailCard>
              </Group>
              <Group>
                <DetailCard>
                  <LogoImage src={windSpeed} alt="Wind Speed Logo" />
                  <p>
                    W. Speed:{" "}
                    <span style={span}>
                      {weather.wind.speed + " " + unit.speed}
                    </span>
                  </p>
                </DetailCard>
                <DetailCard>
                  <LogoImage src={windDirection} alt="Wind Direction Logo" />
                  <p>
                    W. Direction:{" "}
                    <span style={span}>{degToCompass(weather.wind.deg)}</span>
                  </p>
                </DetailCard>
              </Group>
            </DetailsContainer>
          </WeatherContainer>
          <Button
            onClick={() => {
              showComponent();
            }}
            style={{ display: "block", margin: "25px auto" }}
          >
            {button}
          </Button>
          {visibility && <Forecast city={city} unit={unit} appid={appid} />}
          <div style={{ margin: "1em" }}>
            Icons made by{" "}
            <a href="https://www.freepik.com" title="Freepik">
              Freepik
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Current;
