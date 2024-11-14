import { useContext, useLayoutEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({ route, navigation }) {
    const [isFetching, setIsFetching] = useState(false);
    const expensesContext = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;
    const [error, setError] = useState();

    const selectedExpense = expensesContext.expenses.find((expense) => expense.id === editedExpenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing])

    async function deleteExpenseHandler() {
        setIsFetching(true);
        try {
            await deleteExpense(editedExpenseId)
            expensesContext.deleteExpense(editedExpenseId)
            navigation.goBack();
        } catch (error) {
            setError('error!');
            setIsFetching(false);
        }

    }

    function cancelHandler() {
        navigation.goBack();
    }
    async function confirmHandler(expenseData) {
        setIsFetching(true);
        try {
            if (isEditing) {
                expensesContext.updateExpense(editedExpenseId, expenseData);
                await updateExpense(editedExpenseId, expenseData)

            } else {
                const id = await storeExpense(expenseData);
                expensesContext.addExpense({ ...expenseData, id: id });
            }
            navigation.goBack();
        } catch (error) {
            setError("error!");
            setIsFetching(false);
        }

    }

    if (error && !isEditing) {
        return <ErrorOverlay message={error} />
    }
    if (isFetching) {
        return <LoadingOverlay />
    }

    return (
        <View style={styles.container}>
            <ExpenseForm onCancel={cancelHandler}
                submitLabel={isEditing ? 'Update' : 'Add'}
                onSubmit={confirmHandler}
                defaultValues={selectedExpense} />

            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon='trash'
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteExpenseHandler} />
                </View>)}
        </View>
    )
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    },

})