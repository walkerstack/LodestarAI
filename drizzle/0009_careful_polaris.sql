ALTER TABLE `content_blocks` ADD `status` enum('published','draft') DEFAULT 'published' NOT NULL;--> statement-breakpoint
ALTER TABLE `content_blocks` ADD `draftContent` text;--> statement-breakpoint
ALTER TABLE `content_blocks` ADD `previousContent` text;