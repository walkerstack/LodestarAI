ALTER TABLE `learning_flow` ADD `deeperLinks` text DEFAULT ('[]') NOT NULL;--> statement-breakpoint
ALTER TABLE `learning_flow` ADD `widerLinks` text DEFAULT ('[]') NOT NULL;--> statement-breakpoint
ALTER TABLE `learning_flow` ADD `simplerLinks` text DEFAULT ('[]') NOT NULL;--> statement-breakpoint
ALTER TABLE `learning_flow` DROP COLUMN `deeperSlug`;--> statement-breakpoint
ALTER TABLE `learning_flow` DROP COLUMN `widerSlug`;--> statement-breakpoint
ALTER TABLE `learning_flow` DROP COLUMN `simplerSlug`;