INSERT INTO category (name)
values ('해야 할 일');
INSERT INTO category (name)
values ('하고 있는 일');
INSERT INTO category (name)
values ('완료한 일');

INSERT INTO action (value)
values ('생성');
INSERT INTO action (value)
values ('수정');
INSERT INTO action (value)
values ('이동');
INSERT INTO action (value)
values ('삭제');

INSERT INTO card (position, category_id, title, contents)
values (1000, 1, '제목1', '내용1');
INSERT INTO card (position, category_id, title, contents)
values (2000, 2, '제목2', '내용2');
INSERT INTO card (position, category_id, title, contents)
values (3000, 3, '제목3', '내용3');
INSERT INTO card (position, category_id, title, contents)
values (5000, 1, '제목5', '내용5');
INSERT INTO card (position, category_id, title, contents)
values (5000.1, 1, '제목5.1', '내용5.1');
INSERT INTO card (position, category_id, title, contents)
values (7000, 2, '제목7', '내용7');
INSERT INTO card (position, category_id, title, contents)
values (1000, 2, '제목1', '내용1');
INSERT INTO card (position, category_id, title, contents)
values (5000, 2, '제목5', '내용5');
INSERT INTO card (position, category_id, title, contents)
values (1000, 3, '제목1', '내용1');
INSERT INTO card (position, category_id, title, contents)
values (3000, 3, '제목3', '내용3');
