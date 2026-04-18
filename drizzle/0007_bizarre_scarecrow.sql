CREATE TABLE `prompt_panel_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`categoryId` varchar(64) NOT NULL,
	`categoryLabel` varchar(128) NOT NULL,
	`categoryColor` varchar(32) NOT NULL DEFAULT '#E8520A',
	`categoryBgColor` varchar(32) NOT NULL DEFAULT '#1a0e08',
	`title` varchar(255) NOT NULL,
	`description` text,
	`promptText` text NOT NULL,
	`link` varchar(512),
	`linkLabel` varchar(128),
	`position` int NOT NULL DEFAULT 0,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `prompt_panel_items_id` PRIMARY KEY(`id`)
);
