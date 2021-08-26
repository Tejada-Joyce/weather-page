import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled, { css } from "styled-components";
import useFetch from "./useFetch";
import breakpoints from "./styles/breakpoints";

const h1Style = {
  padding: 10,
  textAlign: "center",
};

const WeatherContainer = styled.div`
  text-align: center;
  background: #eff2f1;
  border: 0.5px solid #eff2f1;
  border-radius: 20px;
  margin: auto 10%;
  padding: 30px 0;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
`;

const CardCont = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  margin: 10px;
  width: 80%;
  border-radius: 20px;
  box-shadow: 0.6rem 0.4rem 1rem rgba(38, 34, 57, 0.37);
  padding: 1rem 1rem;
  @media only screen and ${breakpoints.device.sm} {
    flex-direction: column;
    width: 120px;
    justify-content: start;
  }
`;

const WeatherCard = ({ city, unit, appid }) => {
  var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let apiForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit.value}&appid=${appid}`;

  const { weather, isPending, error } = useFetch(apiForecast);

  if (weather != null && city != null) {
    let data = weather.list.filter((item) => item.dt_txt.includes("15:00:00"));
    let card = data.map((item, i) => {
      var d = new Date(item.dt_txt);
      return (
        <CardCont key={i}>
          <div>
            <Card.Title style={{ textAlign: "center" }}>
              {weekday[d.getDay()]}
            </Card.Title>
            <Card.Text style={{ textAlign: "center" }}>{item.date}</Card.Text>
            <Card.Text style={{ textAlign: "center" }}>
              {Math.round(item.main.temp) + "\xB0" + unit.temp}
            </Card.Text>
          </div>
          <div>
            <Card.Img
              variant="bottom"
              style={{ width: "auto" }}
              src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
            />
            <Card.Text style={{ textAlign: "center" }}>
              {item.weather[0].description}
            </Card.Text>
          </div>
        </CardCont>
      );
    });
    return (
      <div>
        <p style={{ textAlign: "center" }}>
          {weather.city.name + ", " + weather.city.country}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {card}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
      </div>
    );
  }
};

function Forecast({ city, unit, appid }) {
  return (
    <WeatherContainer>
      <h2 style={h1Style}>5-Day Forecast</h2>
      <WeatherCard city={city} unit={unit} appid={appid} />
    </WeatherContainer>
  );
}

export default Forecast;
