DROP Table if exists card;
DROP Table if exists category;
DROP Table if exists history;
DROP Table if exists action;

CREATE TABLE category
(
    id   bigint AUTO_INCREMENT,
    name varchar(32) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE card
(
    id          bigint AUTO_INCREMENT,
    category_id bigint       NOT NULL,
    position    double       NOT NULL,
    title       varchar(64)  NOT NULL,
    contents    varchar(500) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category (id),
    PRIMARY KEY (id)
);

CREATE TABLE action
(
    id    bigint AUTO_INCREMENT,
    value varchar(10) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE history
(
    id          bigint AUTO_INCREMENT,
    action_id   bigint      NOT NULL,
    title       varchar(64) NOT NULL,
    origin      varchar(64),
    destination varchar(64),
    at          varchar(64),
    created_at  timestamp   NOT NULL,
    FOREIGN KEY (action_id) REFERENCES action (id),
    PRIMARY KEY (id)
);
