import { ReactNode } from "react"; // Import the ReactNode type for typing potential children props.

// Define the global variable fields for a Button "object" (think Java OOP):
interface ButtonProps {
  children: ReactNode; // The children prop is specified as ReactNode type, which accepts any valid React node (string, element, component, etc.). In this case, to give the Button some text.
  color?: "success"; // Optional color prop for styling the button.
  onClick: () => void; // The generic onClick prop that handles click events.
}

// A function that returns a button element with dynamic text and styling based on the provided props (function indicated by the => syntax).
const Button = ({ children, color = "success", onClick }: ButtonProps) => {
  return (
    <button type="button" className={"btn btn-" + color} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button; // Export the Button component for use in other parts of the application.
