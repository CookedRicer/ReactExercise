import { Record } from "../todoList/TodoSlice";
interface RecordProps extends Record {}

function HistoryList(props: RecordProps) {
  const mapDate = (input: Date) => {
    input = new Date(input);
    const Y = input.getFullYear();
    const M = input.getMonth() + 1;
    const D = input.getDate();
    const H = input.getHours();
    const T = input.getMinutes();
    return `${Y}/${String(M).padStart(2, "0")}/${String(D).padStart(
      2,
      "0",
    )} ${String(H).padStart(2, "0")}:${String(M).padStart(2, "0")}`;
  };
  return (
    <>
      <tr>
        <td className="text-sm overflow-hidden">{props.action}</td>
        <td className="font-mono text-sm font-bold overflow-hidden">
          {props.item.item}
        </td>
        <td className="font-mono text-sm overflow-hidden">
          {mapDate(props.updated_at)}
        </td>
      </tr>
    </>
  );
}

export default HistoryList;
