CREATE TABLE `content_blocks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pageSlug` varchar(128) NOT NULL,
	`blockType` enum('text','card','doc','image') NOT NULL,
	`position` int NOT NULL DEFAULT 0,
	`content` text NOT NULL,
	`isMirror` boolean NOT NULL DEFAULT false,
	`mirrorSourceId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `content_blocks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media_library` (
	`id` int AUTO_INCREMENT NOT NULL,
	`filename` varchar(255) NOT NULL,
	`url` text NOT NULL,
	`fileKey` varchar(512) NOT NULL,
	`mimeType` varchar(128) NOT NULL,
	`mediaType` enum('image','doc') NOT NULL,
	`fileSize` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `media_library_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `page_links` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pageSlug` varchar(128) NOT NULL,
	`label` varchar(255) NOT NULL,
	`destination` varchar(512) NOT NULL,
	`position` int NOT NULL DEFAULT 0,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `page_links_id` PRIMARY KEY(`id`)
);
