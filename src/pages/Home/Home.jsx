import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  //   useEffect(() => {
  //     const url = "data.json";
  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((json) => {
  //         //   console.log("Fetched data:", json); // Add this line to check the fetched data
  //         setData(json);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       });
  //   }, []);

  // fetching data
  const FetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("data.json");
      if (
        response.status === 200 &&
        response.data &&
        response.data.flightOffer
      ) {
        setData(response.data.flightOffer);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    FetchData();
  }, []);
  // console.log("Fetched data:", data);
  return (
    <div className="mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <p>Data parsed successfully</p>

          <table className="w-full">
            <thead>
              <tr className="uppercase text-normal bg-gray-300">
                <th>flight</th>
                <th>aircraft</th>
                <th>class</th>
                <th>fare</th>
                <th>route</th>
                <th>departure</th>
                <th>arrival</th>
                <th>duration</th>
                <th>price</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {data &&
                data.map((ele, index) => {
                  return (
                    <tr /* className=" bg-gray-200" */ key={index}>
                      <td>
                        {ele.itineraries[0].segments.map((ele, index) => {
                          return (
                            <p key={index}>
                              {ele.marketingCarrier} {ele.aircraft}
                            </p>
                          );
                        })}
                      </td>
                      <td>
                        {ele.itineraries[0].segments.map((ele, index) => {
                          return <p key={index}>{ele.flightNumber}</p>;
                        })}
                      </td>
                      <td>
                        {ele.class[0].map((ele, index) => {
                          return <p key={index}>{ele}</p>;
                        })}
                      </td>
                      <td>
                        {ele.fareBasis[0].map((ele, index) => {
                          return <p key={index}>{ele}</p>;
                        })}
                      </td>
                      <td>
                        {ele.itineraries[0].segments.map((ele, index) => {
                          return (
                            <p key={index}>
                              {ele.departure.iataCode} {ele.arrival.iataCode}
                            </p>
                          );
                        })}
                      </td>
                      <td>
                        {ele.itineraries[0].segments.map((ele, index) => {
                          return <p key={index}>{ele.departure.at}</p>;
                        })}
                      </td>
                      <td>
                        {ele.itineraries[0].segments.map((ele, index) => {
                          return <p key={index}>{ele.arrival.at}</p>;
                        })}
                      </td>
                      <td>
                        {<p key={index}>{ele.itineraries[0].duration}</p>}
                      </td>
                      <td className="btn">
                        <p>{ele.price}</p> <br /> <br />
                        <button className="uppercase">Select</button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {!loading && data && data.length === 0 && (
            <div className="">
              <span>No Data Found</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
