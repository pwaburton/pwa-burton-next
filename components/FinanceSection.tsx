import React, { useState } from 'react';
import { Payment, Expense } from '../types';

interface FinanceSectionProps {
  accountBalance: number;
  payments: Payment[];
  expenses: Expense[];
  onAddExpense: (amount: number, description: string) => Promise<void>;
}

const FinanceSection: React.FC<FinanceSectionProps> = ({
  accountBalance,
  payments,
  expenses,
  onAddExpense,
}) => {
  const [newExpenseAmount, setNewExpenseAmount] = useState<string>('');
  const [newExpenseDescription, setNewExpenseDescription] = useState<string>('');

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(newExpenseAmount);
    if (!isNaN(amount) && newExpenseDescription) {
      onAddExpense(amount, newExpenseDescription);
      setNewExpenseAmount('');
      setNewExpenseDescription('');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Finance Section</h2>
      
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Account Balance</h3>
        <p className="text-2xl font-bold">${accountBalance.toFixed(2)}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Recent Payments</h3>
        <ul className="space-y-2">
          {payments.slice(0, 5).map((payment) => (
            <li key={payment.id} className="flex justify-between items-center">
              <span>{formatDate(payment.date)}</span>
              <span className="font-semibold">${Number(payment.amount).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Recent Expenses</h3>
        <ul className="space-y-2">
          {expenses.slice(0, 5).map((expense) => (
            <li key={expense.id} className="flex justify-between items-center">
              <span>{formatDate(expense.date)} - {expense.description}</span>
              <span className="font-semibold">${Number(expense.amount).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Add New Expense</h3>
        <form onSubmit={handleAddExpense} className="space-y-4">
          <div>
            <label htmlFor="expenseAmount" className="block mb-1">Amount</label>
            <input
              type="number"
              id="expenseAmount"
              value={newExpenseAmount}
              onChange={(e) => setNewExpenseAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="expenseDescription" className="block mb-1">Description</label>
            <input
              type="text"
              id="expenseDescription"
              value={newExpenseDescription}
              onChange={(e) => setNewExpenseDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default FinanceSection;