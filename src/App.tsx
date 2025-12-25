import { useState } from "react";
import Textfield from "./components/textfield"; // Import the Textfield component from the components folder.
import Button from "./components/Button"; // Import the Button component from the components folder.

function App() {
  const [minutes, setMinutes] = useState<string>(""); // Initialize the state for minutes (make the string start as empty).
  const [seconds, setSeconds] = useState<string>(""); // Initialize the state for seconds (make the string start as empty).
  const [stockSymbol, setStockSymbol] = useState<string>(""); // Initialize the state for stock symbol (make the string start as empty).

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

      <Button // Placeholder function for the button click event.
        onClick={() => console.log("Button clicked!")}
      >
        SUBMIT
      </Button>
    </div>
  );
}

export default App;
