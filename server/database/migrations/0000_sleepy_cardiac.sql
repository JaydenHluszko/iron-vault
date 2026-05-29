CREATE TABLE `accounts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`currency` text DEFAULT 'CAD' NOT NULL,
	`created_at` text DEFAULT '2026-05-25T19:42:32.150Z'
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`account_id` integer,
	`ticker` text,
	`type` text NOT NULL,
	`shares` real DEFAULT 0,
	`price_per_share` real DEFAULT 0,
	`amount` real NOT NULL,
	`currency` text DEFAULT 'CAD' NOT NULL,
	`date` text NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE no action
);
