import React, { useState, useEffect } from "react";

function FlightSearch() {
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [origin, setOrigin] = useState("DAC");
  const [destination, setDestination] = useState("FCO");
  const [date, setDate] = useState("2022-11-22");
  const [timeOfDay, setTimeOfDay] = useState("anytime");

  useEffect(() => {
    fetchFlightData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFlightData = async () => {
    try {
      const response = await fetch("data.json");
      const data = await response.json();
      handleSearch(data);
    } catch (error) {
      console.error("Error fetching flight data:", error);
    }
  };

  const handleSearch = (flightData) => {
    if (
      !flightData ||
      !flightData.flightOffer ||
      !Array.isArray(flightData.flightOffer)
    ) {
      console.error("Flight data is missing or not in the expected format.");
      return;
    }

    const filtered = flightData.flightOffer.filter((flight) => {
      return (
        flight.itineraries[0].segments[0].departure.iataCode === origin &&
        flight.itineraries[0].segments[1].arrival.iataCode === destination &&
        flight.itineraries[0].segments[0].departure.at.includes(date) &&
        true
      );
    });

    setFilteredFlights(filtered);
  };

  console.log(filteredFlights);

  return (
    <div className="my-12">
      <>
        <div className="text-center mx-5">
          <button className="border border-gray-500 p-2 gap-2 ">
            Round Trip
          </button>
          <button className="border border-gray-500 p-2 gap-2 " autoFocus>
            One Way
          </button>
          <button className="border border-gray-500 p-2 gap-2 ">
            Multi City
          </button>
        </div>
        <div className="border-b-2 border-gray-500 my-2"></div>

        <div className="mt-6">
          <div className="flex justify-between">
            <input
              className="border border-gray-500 px-3 py-1"
              type="text"
              placeholder="Origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
            <input
              className="border border-gray-500 px-3 py-1"
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <input
              className="border border-gray-500 px-3 py-1"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <select
              className="border border-gray-500 px-3 py-1"
              name="day"
              id="daySelect"
            >
              <option value="">Day {"-"}</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
            </select>
            <select
              className="border border-gray-500 px-3 py-1"
              name="day"
              id="daySelect"
            >
              <option>Day {"+"}</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
            </select>
            <select
              className="border border-gray-500 px-3 py-1"
              value={timeOfDay}
              onChange={(e) => setTimeOfDay(e.target.value)}
            >
              <option value="anytime">Any Time</option>
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
              <option value="night">Night</option>
            </select>
            <select className="border border-gray-500 px-3 py-1" name="" id="">
              <option value="adt">ADT</option>
              <option value="est">EST</option>
              <option value="edt">EDT</option>
              <option value="gmt">GMT</option>
              <option value="ist">IST</option>
            </select>
            <select className="border border-gray-500 px-3 py-1" name="" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <button
              className="border border-gray-500 px-3 py-1"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          <div className="border-b-2 border-gray-500 mt-[24px]"></div>

          <div className="flex justify-between mt-6">
            <div>
              <input type="checkbox" name="" id="extraoption" />
              <label htmlFor="extraoption">Extra Option</label>
            </div>
            <div>
              <label>Environment</label>
              <input className="p-5" type="radio" name="same" id="dummy" />
              <label htmlFor="dummy">Dummy</label>
              <input type="radio" name="same" id="pdt" />
              <label htmlFor="pdt">PDT</label>
            </div>
            <div>
              <button className="searchButton">Search</button>
            </div>
          </div>

          {/* Display filtered flights */}
          {filteredFlights.length > 0 ? (
            <div className="mt-4">
              <h2 className="text-lg font-bold mb-2">
                Data parsed successfully
              </h2>

              <>
                <table className="w-full">
                  <thead>
                    <tr className="uppercase text-normal bg-gray-300">
                      <th>Flight</th>
                      <th>Aircraft</th>
                      <th>Class</th>
                      <th>Fare</th>
                      <th>Route</th>
                      <th>Departure</th>
                      <th>Arrival</th>
                      <th>Duration</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {filteredFlights &&
                      filteredFlights.map((dt, index) => {
                        return (
                          <tr
                            className={index % 2 === 1 ? "bg-gray-200" : ""}
                            key={index}
                          >
                            <td>
                              {dt.itineraries[0].segments.map((ele, index) => {
                                return (
                                  <p key={index}>
                                    {ele.marketingCarrier} {ele.aircraft}
                                  </p>
                                );
                              })}
                            </td>
                            <td>
                              {dt.itineraries[0].segments.map((ele, index) => {
                                return <p key={index}>{ele.flightNumber}</p>;
                              })}
                            </td>
                            <td>
                              {dt.class[0].map((ele, index) => {
                                return <p key={index}>{ele}</p>;
                              })}
                            </td>
                            <td>
                              {dt.fareBasis[0].map((ele, index) => {
                                return <p key={index}>{ele}</p>;
                              })}
                            </td>
                            <td>
                              {dt.itineraries[0].segments.map((ele, index) => {
                                return (
                                  <p key={index}>
                                    {ele.departure.iataCode}{" "}
                                    {ele.arrival.iataCode}
                                  </p>
                                );
                              })}
                            </td>
                            <td>
                              {dt.itineraries[0].segments.map((ele, index) => {
                                return <p key={index}>{ele.departure.at}</p>;
                              })}
                            </td>
                            <td>
                              {dt.itineraries[0].segments.map((ele, index) => {
                                return <p key={index}>{ele.arrival.at}</p>;
                              })}
                            </td>
                            <td>
                              {<p key={index}>{dt.itineraries[0].duration}</p>}
                            </td>
                            <td className="btn">
                              <p>{dt.price}</p> <br /> <br />
                              <button className="uppercase">Select</button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </>
            </div>
          ) : null}
        </div>
      </>
    </div>
  );
}

export default FlightSearch;
