INSERT INTO category (name)
values ('해야 할 일');
INSERT INTO category (name)
values ('하고 있는 일');
INSERT INTO category (name)
values ('완료한 일');

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
values (4000, 3, '제목4', '내용4');

INSERT INTO history (action, title, origin, destination, at)
values ("생성", "밥먹기", null, null, "해야 할 일");
INSERT INTO history (action, title, origin, destination, at)
values ("이동", "잠 잘자기", "해야 할 일", "하고 있는 일", null);
INSERT INTO history (action, title, origin, destination, at)
values ("생성", "코딩", null, null, "해야 할 일");
INSERT INTO history (action, title, origin, destination, at)
values ("생성", "쇼핑", null, null, "해야 할 일");
INSERT INTO history (action, title, origin, destination, at)
values ("이동", "스트레스받기", "해야 할 일", "하고 있는 일", null);
INSERT INTO history (action, title, origin, destination, at)
values ("생성", "집가기", null, null, "해야 할 일");
INSERT INTO history (action, title, origin, destination, at)
values ("삭제", "술먹기", null, null, "해야 할 일");
INSERT INTO history (action, title, origin, destination, at)
values ("이동", "빨래하기", "해야 할 일", "하고 있는 일", null);
INSERT INTO history (action, title, origin, destination, at)
values ("이동", "설거지하기", "해야 할 일", "하고 있는 일", null);
INSERT INTO history (action, title, origin, destination, at)
values ("생성", "샤워하기", null, null, "해야 할 일");
INSERT INTO history (action, title, origin, destination, at)
values ("생성", "숨쉬기", null, null, "해야 할 일");
INSERT INTO history (action, title, origin, destination, at)
values ("수정", "수선집 가기", null, null, "해야 할 일");
INSERT INTO history (action, title, origin, destination, at)
values ("이동", "김영한님과 데이트하기", "하고 있는 일", "완료한 일", null);
INSERT INTO history (title, action, origin, destination, at)
values ("생성", "초코스콘 사먹기", null, null, "해야 할 일");
INSERT INTO history (action, title, origin, destination, at)
values ("생성", "분리수거", null, null, "해야 할 일");
INSERT INTO history (action, title, origin, destination, at)
values ("이동", "먼지 예뻐하기", "해야할 일", "하고 있는 일", null);
INSERT INTO history (action, title, origin, destination, at)
values ("생성", "티비보기", null, null, "해야 할 일");
INSERT INTO history (action, title, origin, destination, at)
values ("삭제", "유툽 보기", null, null, "해야 할 일");
INSERT INTO history (action, title, origin, destination, at)
values ("생성", "JPA 공부", null, null, "해야 할 일");
INSERT INTO history (action, title, origin, destination, at)
values ("이동", "알고리즘 풀기", "해야할 일", "하고 있는 일", null);
INSERT INTO history (action, title, origin, destination, at)
values ("이동", "말랑이 사기", "하고 있는 일", "완료한 일", null);
