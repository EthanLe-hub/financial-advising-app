import { useState, useEffect } from "react";
import Textfield from "./components/textfield"; // Import the Textfield component from the components folder.
import Button from "./components/Button"; // Import the Button component from the components folder.

// This is the data that one row in the table will contain -- one StockData object represents a single row:
interface StockData {
  openPrice: number; // The opening price of the stock as a number type.
  highPrice: number; // The highest price of the stock as a number type.
  lowPrice: number; // The lowest price of the stock as a number type.
  currentPrice: number; // The current price of the stock as a number type.
  previousClosePrice: number; // The previous closing price of the stock as a number type.
  time: string; // The time of the stock data as a string type.
}

function App() {
  const [minutes, setMinutes] = useState<string>(""); // Initialize the state for minutes as a string (make the string start as empty).
  const [seconds, setSeconds] = useState<string>(""); // Initialize the state for seconds as a string (make the string start as empty).
  const [stockSymbol, setStockSymbol] = useState<string>(""); // Initialize the state for stock symbol as a string (make the string start as empty).
  const [stockData, setStockData] = useState<StockData[]>([]); // Initialize the state for stock data as an array of StockData objects (make the array start as empty).
  const [isTracking, setIsTracking] = useState<boolean>(false); // Initialize the state for isTracking as a boolean (make it initially false, it will get set to true to indicate when the SUBMIT button has been pressed).

  // Effect Hook that starts and cleans up a polling interval to fetch stock data based on the user-defined interval:
  useEffect(() => {
    if (!isTracking) {
      return; // If isTracking is false, do not set up the interval (it will only be true once the SUBMIT button is clicked).
    }

    if (!stockSymbol) {
      return; // If stockSymbol is empty, do not set up the interval.
    }

    fetchStockData(); // Fetch stock data IMMEDIATELY when the SUBMIT button is clicked; then the interval starts.

    // Convert minutes state and seconds state to total milliseconds:
    const totalMilliseconds = Number(minutes) * 60000 + Number(seconds) * 1000; // Cast minutes and seconds from string to number using the Number() function.

    if (totalMilliseconds <= 0) {
      return; // If the totalMilliseconds is set to less than or equal to 0, do not set up the interval.
    }

    const interval = setInterval(fetchStockData, totalMilliseconds); // Set up an interval that calls fetchStockData function after every totalMilliseconds interval.

    return () => clearInterval(interval); // clearInterval() is a cleanup function that clears the interval when the component (App) disconnects or when the Effect Hook is refreshed (prevents memory leaks).
  }, [isTracking, minutes, seconds, stockSymbol]); // The Effect Hook will re-run whenever isTracking, minutes, seconds, or stockSymbol state changes.

  /*
  // Function that adds a fake row to the stock data table when the SUBMIT button is clicked (must be inside App function to access state variables):
  const addFakeRow = () => {
    const newEntry: StockData = {
      // Create a new StockData object with the following global variable fields (think of objects in Java OOP).
      openPrice: 318.25,
      highPrice: 323.44,
      lowPrice: 315.63,
      currentPrice: 316.77,
      previousClosePrice: 318.11,
      time: new Date().toLocaleTimeString(), // Get the current time as a string.
    };

    setStockData((previousData) => [...previousData, newEntry]); // Update stockData state by adding (appending) the new StockData object to previousData (the existing stockData array).
  };
  */

  // Function that fetches REAL stock data from an API based on the stockSymbol, minutes, and seconds inputted by the user:
  const fetchStockData = async () => {
    // Must be async because we are using await inside the function, which waits for the fetch call to be finished before continuing.
    if (!stockSymbol) {
      // If stockSymbol is empty, do not fetch any data.
      return;
    }

    // Fetch stock data (quotes) from the Finnhub API using the stockSymbol entered by the user:
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=d569l0hr01qu3qo99me0d569l0hr01qu3qo99meg`
    );

    if (!response.ok) {
      console.log("Error fetching stock data");
      return; // If the response is not OK (status code not in the range 200-299), log an error message and exit the function.
    }

    const realData = await response.json(); // Parse the response as JSON before using it. The "realData" variable now contains the stock data from the API as a JavaScript object.

    const newEntry: StockData = {
      // Create a new StockData object with the following global variable fields from the API response (use realData variable to get the data for each field) (again, think of objects in Java OOP).
      openPrice: realData.o, // Opening price from API response (under Quote object in Finnhub documentations).
      highPrice: realData.h, // High price from API response.
      lowPrice: realData.l, // Low price from API response.
      currentPrice: realData.c, // Current price from API response.
      previousClosePrice: realData.pc, // Previous close price from API response.
      time: new Date().toLocaleTimeString(), // Get the current time as a string.
    };

    setStockData((previousData) => [...previousData, newEntry]); // Update stockData state by adding (appending) the new StockData object to previousData (the existing StockData array).
  };

  return (
    <div>
      <Textfield
        placeholder="MIN"
        value={minutes} // (2) The input value (string) dynamically changes based on the minutes state -- the onChange event is what updates it.
        onChange={(e) => setMinutes(e.target.value)} // (1) Update the minutes state when the input value changes.
      />
      {/* Set the placeholder to "MIN", the input value to an empty string, and update the minutes state when the input value changes. */}

      <Textfield
        placeholder="SEC"
        value={seconds} // (2) The input value (string) dynamically changes based on the seconds state -- the onChange event is what updates it.
        onChange={(e) => setSeconds(e.target.value)} // (1) Update the seconds state when the input value changes.
      />
      {/* Set the placeholder to "SEC", the input value to an empty string, and update the seconds state when the input value changes. */}

      <Textfield
        placeholder="STOCK SYMBOL"
        value={stockSymbol} // (2) The input value (string) dynamically changes based on the stockSymbol state -- the onChange event is what updates it.
        onChange={(e) => setStockSymbol(e.target.value)} // (1) Update the stockSymbol state when the input value changes.
      />
      {/* Set the placeholder to "STOCK SYMBOL", the input value to an empty string, and update the stockSymbol state when the input value changes. */}

      <Button // Function for the button click event.
        onClick={() => {
          if (!isTracking) setIsTracking(true);
        }} // If isTracking is false, set the isTracking state to true when the SUBMIT button is clicked -- the useEffect function will now run properly since isTracking is no longer false; the fetchStockData function will now be called (fetches stock data from the API).
      >
        SUBMIT
      </Button>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Open Price</th>
            <th scope="col">High Price</th>
            <th scope="col">Low Price</th>
            <th scope="col">Current Price</th>
            <th scope="col">Previous Close Price</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map(
            (
              row,
              indexNumber // Map over each StockData object (row) in the stockData array and render a table row for each one. The indexNumber is used as the key for each row.
            ) => (
              // Get each global variable field from the StockData object and render it in a table cell.
              <tr key={indexNumber}>
                <td>{row.openPrice}</td>
                <td>{row.highPrice}</td>
                <td>{row.lowPrice}</td>
                <td>{row.currentPrice}</td>
                <td>{row.previousClosePrice}</td>
                <td>{row.time}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
