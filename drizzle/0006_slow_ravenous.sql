CREATE TABLE `lexicon_terms` (
	`id` int AUTO_INCREMENT NOT NULL,
	`term` varchar(255) NOT NULL,
	`category` varchar(64) NOT NULL DEFAULT 'CORE',
	`link` varchar(255),
	`everyday` text NOT NULL,
	`professional` text NOT NULL,
	`watcher` text NOT NULL,
	`position` int NOT NULL DEFAULT 0,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lexicon_terms_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `prompt_games` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`category` varchar(128) NOT NULL,
	`prompt` text NOT NULL,
	`poster` varchar(512),
	`learningWhat` text,
	`learningWhy` text,
	`learningHow` text,
	`position` int NOT NULL DEFAULT 0,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `prompt_games_id` PRIMARY KEY(`id`)
);
