CREATE TABLE `nav_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`section` enum('lenses','foundation','for-you','tools','research','explore') NOT NULL,
	`label` varchar(255) NOT NULL,
	`path` varchar(512) NOT NULL,
	`colour` varchar(128),
	`position` int NOT NULL DEFAULT 0,
	`isPublished` boolean NOT NULL DEFAULT false,
	`isFooter` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `nav_items_id` PRIMARY KEY(`id`)
);
