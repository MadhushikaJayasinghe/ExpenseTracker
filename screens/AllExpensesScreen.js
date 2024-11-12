import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses() {
    const expensesContext = useContext(ExpensesContext);
    return <ExpensesOutput expenses={expensesContext.expenses} expensePeriod="Total" fallbackText="No expenses!" />
}

export default AllExpenses;