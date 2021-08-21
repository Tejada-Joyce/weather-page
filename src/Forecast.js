import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import useFetch from "./useFetch";

const h1Style = {
  backgroundColor: "#D3D3D3",
  padding: 20,
  textAlign: "center",
};

const WeatherCard = ({ city, unit, appid }) => {
  var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let apiForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit.value}&appid=${appid}`;

  const { weather, isPending, error } = useFetch(apiForecast);

  if (weather != null && city != null) {
    let data = weather.list.filter((item) => item.dt_txt.includes("15:00:00"));
    let card = data.map((item, i) => {
      var d = new Date(item.dt_txt);
      return (
        <Card
          border="primary"
          key={i}
          style={{ margin: "10px", width: "100px" }}
        >
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>
              {weekday[d.getDay()]}
            </Card.Title>
            {/* <Card.Text style={{ textAlign: "center" }}>{item.date}</Card.Text> */}
            <Card.Text style={{ textAlign: "center" }}>
              {Math.round(item.main.temp) + "\xB0" + unit.temp}
            </Card.Text>
            <Card.Img
              variant="bottom"
              src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
            />
            <Card.Text style={{ textAlign: "center" }}>
              {item.weather[0].description}
            </Card.Text>
          </Card.Body>
        </Card>
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
    <section>
      <h1 style={h1Style}>5-Day Forecast</h1>
      <WeatherCard city={city} unit={unit} appid={appid} />
    </section>
  );
}

export default Forecast;
