import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDate } from "../util/date";

function RecentExpenses() {
    const expensesContext = useContext(ExpensesContext);

    const recentExpenses = expensesContext.expenses.filter((expense) => {
        const today = new Date();
        const date7daysAgo = getDateMinusDate(today, 7);
        return expense.date > date7daysAgo;

    });
    return <ExpensesOutput expenses={recentExpenses} expensePeriod='Last 7 days' fallbackText="No expenses for the last 7 days"/>
}

export default RecentExpenses;