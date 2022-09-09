drop table if exists cards;
drop table if exists columns;
drop table if exists boards;

create table boards (
	id_board int unsigned NOT NULL AUTO_INCREMENT primary key,
	name varchar(255)
);

create table columns (
	id_column int unsigned NOT NULL AUTO_INCREMENT primary key,
	id_board int unsigned NOT NULL,
	name varchar(255),
	has_estimative bool,
    CONSTRAINT column_id_board_foreign FOREIGN KEY (id_board) REFERENCES boards (id_board) ON DELETE CASCADE ON UPDATE CASCADE
);

create table cards (
	id_card int(10) unsigned NOT NULL AUTO_INCREMENT primary key,
	id_column int(10) unsigned NOT NULL,
	title varchar(255),
	estimative int(10),
	color varchar(255),
	`order` int,
    CONSTRAINT card_id_column_foreign FOREIGN KEY (id_column) REFERENCES columns (id_column) ON DELETE CASCADE ON UPDATE CASCADE
);

insert into boards (name) values ('Projeto 1');
insert into columns (id_board, name, has_estimative) values (1, 'Coluna A', true);
insert into columns (id_board, name, has_estimative) values (1, 'Coluna B', true);
insert into columns (id_board, name, has_estimative) values (1, 'Coluna C', true);
insert into cards (id_column, title, color, estimative, `order`) values (1, 'Atividade 1', 'blue', 3, 1);
insert into cards (id_column, title, color, estimative, `order`) values (1, 'Atividade 2', 'yellow', 2, 2);
insert into cards (id_column, title, color, estimative, `order`) values (1, 'Atividade 3', 'red', 1, 3);
insert into cards (id_column, title, color, estimative, `order`) values (1, 'Atividade 4', 'green', 2, 4);
insert into cards (id_column, title, color, estimative, `order`) values (1, 'Atividade 5', 'orange', 5, 5);
insert into cards (id_column, title, color, estimative, `order`) values (1, 'Atividade 6', 'white', 6, 6);
insert into boards (name) values ('Projeto 2');
insert into columns (id_board, name, has_estimative) values (2, 'Coluna A', true);