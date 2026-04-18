CREATE TABLE `studio_pages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(128) NOT NULL,
	`label` varchar(255) NOT NULL,
	`path` varchar(255) NOT NULL,
	`template` enum('blank','article','lens','card-grid') NOT NULL DEFAULT 'blank',
	`isPublished` boolean NOT NULL DEFAULT false,
	`navCategory` varchar(64),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `studio_pages_id` PRIMARY KEY(`id`),
	CONSTRAINT `studio_pages_slug_unique` UNIQUE(`slug`)
);
