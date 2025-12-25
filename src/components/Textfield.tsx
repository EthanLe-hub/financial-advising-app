import { ReactNode } from "react"; // Import the ReactNode type for typing the children props.

// Define the global variable fields for a Textfield "object" (think Java OOP):
interface TextfieldProps {
  value: string; // The current value of the text field.
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // This event handler will be called whenever the text field's input value changes. The event's type must be specified so TypeScript knows what type of event it is.
  placeholder: string; // The placeholder text for the text field.
}

// A function that returns a text field element with dynamic input value, onChange event handler, and placeholder text based on the provided props (function indicated by => syntax).
const Textfield = ({ value, onChange, placeholder }: TextfieldProps) => {
  // Render the text field with the provided value, onChange event handler, and placeholder text. These are rendered using the provided props for dynamic content and behavior.
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label={placeholder}
        aria-describedby="basic-addon1"
      ></input>
    </div>
  );
};

export default Textfield; // Export the TextField component as the default export. This allows it to be imported and used in other parts of the application.
