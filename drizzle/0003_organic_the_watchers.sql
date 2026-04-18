CREATE TABLE `learning_flow` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pageSlug` varchar(128) NOT NULL,
	`deeperSlug` varchar(128),
	`widerSlug` varchar(128),
	`simplerSlug` varchar(128),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `learning_flow_id` PRIMARY KEY(`id`),
	CONSTRAINT `learning_flow_pageSlug_unique` UNIQUE(`pageSlug`)
);
