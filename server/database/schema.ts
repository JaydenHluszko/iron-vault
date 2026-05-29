import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// 💳 ACCOUNTS TABLE (Checking, Savings, Wealthsimple, etc.)
export const accounts = sqliteTable('accounts', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(), // e.g., "Wealthsimple Cash"
    type: text('type').notNull(), // "cash", "investment", "tfsa", "rrsp"
    currency: text('currency').notNull().default('CAD'), // Core operational currency
    createdAt: text('created_at').default(new Date().toISOString()),
});

// 📈 TRANSACTIONS & INVESTMENT LOTS TABLE
export const transactions = sqliteTable('transactions', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    accountId: integer('account_id').references(() => accounts.id),
    ticker: text('ticker'), // e.g., "QQQ" or null for plain cash deposits
    type: text('type').notNull(), // "BUY", "SELL", "DEPOSIT", "WITHDRAWAL"

    // Financial metrics handled as numbers
    shares: real('shares').default(0), // Total share volume
    pricePerShare: real('price_per_share').default(0), // Base execution price
    amount: real('amount').notNull(), // Total final impact on cash balance
    currency: text('currency').notNull().default('CAD'), // Transaction execution currency

    date: text('date').notNull(), // Date string entry
});