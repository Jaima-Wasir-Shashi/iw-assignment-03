import { formatMoney } from "../utils/format-money";
import { useEntries } from "../hooks/useEntries";
import { useMemo } from "react";

export default function ExpenseList() {
  const { entries, setEntries } = useEntries();
  const expenseEntries = useMemo(()=> {
      return entries.filter((entry) => entry.type === "expense")
  },[entries]);

  const handleDelete = (id)=> {
    setEntries((prev)=> {
        const newEntries = [...prev].filter((entry)=> {
            return id !== entry.id;
        });
        return newEntries;
      })
}
  return (
    <div>
      <h2 className="border-b pb-2 font-medium text-red-600">Expense</h2>

      {expenseEntries.length === 0 && (
        <p className="py-2.5 text-gray-600">There are no expenses.</p>
      )}

      <ul id="expense-list" className="divide-y">
        {expenseEntries.map((item) => {
          return (
            <li key={item.id} className="py-2.5">
              <div className="group flex justify-between gap-2 text-sm">
                <span>{item.title}</span>
                <div>
                  <span className="text-red-600">
                    -{formatMoney(item.value)}
                  </span>
                  <span onClick={()=>handleDelete(item.id)} className="ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block">
                    Delete
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
