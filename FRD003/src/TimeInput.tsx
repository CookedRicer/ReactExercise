import { useState } from "react";

interface TimeInputProps {
  max: number;
}
function TimeInput(props: TimeInputProps) {
  const [input, setInput] = useState("00");
  const inputValidate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2) {
      setInput(input.substring(0, input.length - 1));
      return;
    }
    setInput(e.target.value);
  };

  const inputValidateBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (Number(input) < 10) {
      setInput(input.padStart(2, "0"));
    }
    if (Number(input) > props.max) {
      setInput(props.max.toString());
    }
  };

  return (
    <>
      <input
        className="w-4/12 h-24 text-center text-5xl bg-neutral rounded-md p-5 font-bold"
        type="number"
        min="0"
        max={props.max}
        value={input}
        onChange={(e) => {
          inputValidate(e);
        }}
        onBlur={(e) => inputValidateBlur(e)}
        placeholder="00"
        title="setTime"
      ></input>
    </>
  );
}
export default TimeInput;
