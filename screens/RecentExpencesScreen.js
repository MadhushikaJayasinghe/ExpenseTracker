import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDate } from "../util/date";
import { fetchExpences } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
    const expensesContext = useContext(ExpensesContext);

    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            try {
                const expenses = await fetchExpences();
                expensesContext.setExpenses(expenses)
            } catch (error) {
                setError('error');
            }
            setIsFetching(false);

        }

        getExpenses()

    }, []);


    if (error && !isFetching) {
        return <ErrorOverlay message={error}/>
    }

    if (isFetching) {
        return <LoadingOverlay />
    }

    const recentExpenses = expensesContext.expenses.filter((expense) => {
        const today = new Date();
        const date7daysAgo = getDateMinusDate(today, 7);
        return expense.date > date7daysAgo;

    });
    return <ExpensesOutput expenses={recentExpenses} expensePeriod='Last 7 days' fallbackText="No expenses for the last 7 days" />
}

export default RecentExpenses;