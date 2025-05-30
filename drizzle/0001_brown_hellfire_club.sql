ALTER TABLE `users` MODIFY COLUMN `name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `email` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `nameEncrypted` json;--> statement-breakpoint
ALTER TABLE `users` ADD `emailEncrypted` json;