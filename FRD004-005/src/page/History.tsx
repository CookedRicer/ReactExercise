import HistoryList from "../feature/history/HistoryList";
import { Record } from "../feature/todoList/TodoSlice";
function History() {
  const recordList = localStorage.getItem("todoRecord")
    ? (JSON.parse(localStorage.getItem("todoRecord") as string) as Record[])
    : [];

  return (
    <div className="flex flex-col bg-base-100/30 backdrop-blur-md shadow-md rounded-xl max-w-xl p-10 mx-auto border border-primary">
      <table className="table table-fixed">
        <thead>
          <tr>
            <th className="w-2/12">Action</th>
            <th className="w-6/12">Task</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {recordList.length > 0 ? (
            recordList.map((record) => (
              <HistoryList
                action={record.action}
                item={record.item}
                updated_at={record.updated_at}
              />
            ))
          ) : (
            <tr>
              <td colSpan={3}>No Record</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default History;
