import axios from "axios";

const BACKEND_URL = 'https://react-native-course-e827b-default-rtdb.asia-southeast1.firebasedatabase.app'
export async function storeExpense(expenseData) {
    const response = await axios.post(
        BACKEND_URL + '/expenses.json',
        expenseData
    );
    return response.data.name;
}

export async function fetchExpences() {
    const response = await axios.get(BACKEND_URL + '/expenses.json');
    const expenses = [];
    const data = response.data;
    for (let key in response.data) {

        if (data.hasOwnProperty(key)) {
            const item = data[key];
            const expenseObj = {
                id: key,
                amount: item.amount,
                date: new Date(item.date),
                description: item.description
            };
            expenses.push(expenseObj);
        }

    }
    return expenses;
}

export function updateExpense(id, expenseData) {
    return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData)
}

export function deleteExpense(id) {
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`)
}