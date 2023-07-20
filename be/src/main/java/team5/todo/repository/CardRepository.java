package team5.todo.repository;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import team5.todo.controller.dto.CardMoveRequest;
import team5.todo.domain.Card;

@Repository
public class CardRepository {
	private static final double GAP_VALUE = 1000D;
	private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

	public CardRepository(DataSource dataSource) {
		this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
	}

	private RowMapper<Card> cardRowMapper() {
		return (rs, rowNum) -> Card.builder()
			.id(rs.getLong("id"))
			.categoryId(rs.getLong("category_id"))
			.position(rs.getDouble("position"))
			.title(rs.getString("title"))
			.contents(rs.getString("contents"))
			.build();
	}

	public List<Card> findAll() {
		String sql = "SELECT id, category_id, position, title, contents FROM card ORDER BY position DESC";
		return namedParameterJdbcTemplate.query(sql, cardRowMapper());
	}

	public long save(Card card) {
		String sql = "INSERT INTO card (category_id, position, title, contents) " +
			"VALUES (:categoryId, " +
			" IFNULL((SELECT MAX(position) FROM (SELECT * FROM card) AS sub WHERE sub.category_id = :categoryId), 0) + :gapValue, "
			+
			" :title, " + " :contents)";
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("categoryId", card.getCategoryId());
		params.addValue("title", card.getTitle());
		params.addValue("contents", card.getContents());
		params.addValue("gapValue", GAP_VALUE);

		KeyHolder keyHolder = new GeneratedKeyHolder();
		namedParameterJdbcTemplate.update(sql, params, keyHolder);
		return keyHolder.getKey().longValue();
	}

	public Card findById(long id) {
		String sql = "SELECT id, category_id, position, title, contents FROM card WHERE id = :id";
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("id", id);
		return namedParameterJdbcTemplate.queryForObject(sql, params, cardRowMapper());
	}

	public void delete(final long id) {
		String sql = "DELETE FROM card WHERE id = :id";
		MapSqlParameterSource params = new MapSqlParameterSource("id", id);
		namedParameterJdbcTemplate.update(sql, params);
	}

	public void modify(Card card) {
		String sql = "UPDATE card SET title = :title , contents = :contents WHERE id = :id";
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("title", card.getTitle());
		params.addValue("contents", card.getContents());
		params.addValue("id", card.getId());

		namedParameterJdbcTemplate.update(sql, params);
	}

	public void moveWithBothCards(CardMoveRequest cardMoveRequest) {
		String sql = "SELECT position from card where id = :beforeId OR id = :afterId";
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("beforeId", cardMoveRequest.getBeforeCardId());
		params.addValue("afterId", cardMoveRequest.getAfterCardId());

		List<Double> positions = namedParameterJdbcTemplate.queryForList(sql, params, Double.class);
		double avgPosition = positions.stream()
			.mapToDouble(Double::doubleValue)
			.average()
			.getAsDouble();
		sql = "UPDATE card SET position = :avgPosition, category_id = :categoryId  WHERE id = :id";
		params.addValue("avgPosition", avgPosition);
		params.addValue("id", cardMoveRequest.getId());
		params.addValue("categoryId", cardMoveRequest.getCategoryId());

		namedParameterJdbcTemplate.update(sql, params);
	}

	public void moveWithAfterCard(CardMoveRequest cardMoveRequest) {
		String sql = "SELECT position from card where category_id = :categoryId AND id = :afterId";
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("categoryId", cardMoveRequest.getCategoryId());
		params.addValue("afterId", cardMoveRequest.getAfterCardId());
		Double position = namedParameterJdbcTemplate.queryForObject(sql, params, Double.class) / 2;

		sql = "UPDATE card SET position = :position, category_id = :categoryId  WHERE id = :id";
		params.addValue("position", position);
		params.addValue("id", cardMoveRequest.getId());

		namedParameterJdbcTemplate.update(sql, params);
	}

	public void moveWithBeforeCard(CardMoveRequest cardMoveRequest) {
		String sql = "SELECT position FROM card WHERE category_id = :categoryId AND id = :beforeId";
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("categoryId", cardMoveRequest.getCategoryId());
		params.addValue("beforeId", cardMoveRequest.getBeforeCardId());
		Double position = namedParameterJdbcTemplate.queryForObject(sql, params, Double.class) + GAP_VALUE;

		sql = "UPDATE card SET position = :position, category_id = :categoryId  WHERE id = :id";
		params.addValue("position", position);
		params.addValue("id", cardMoveRequest.getId());

		namedParameterJdbcTemplate.update(sql, params);
	}

	public void moveWoBothCard(CardMoveRequest cardMoveRequest) {
		String sql = "UPDATE card SET category_id = :categoryId , position = :position WHERE id = :id";
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("categoryId", cardMoveRequest.getCategoryId());
		params.addValue("position", GAP_VALUE);
		params.addValue("id", cardMoveRequest.getId());

		namedParameterJdbcTemplate.update(sql, params);
	}

	public static double getGapValue() {
		return GAP_VALUE;
	}

	/*
	## 앞과 뒤 카드 아이디 없으면 어떻게 position 넣을 것인지? 어디에서 처리할 것인지
	위 (앞): 최신
	카드
	아래 (뒤): 과거

	앞 X 뒤 X: 레포지토리에서 갭 넣음
	앞 O 뒤 X: 앞 카드의 포지션을 가지고 와서 그 값의 절반을 넣습니다.
	앞 X 뒤 O: 뒤 카드의 포지션을 가지고 와서 그 값에 갭밸류를 더해서 넣습니다.
	앞 O 뒤 O: 앞, 뒤 포지션/2해서 넣어줍니다.

	// 변경사항
	앞 O 뒤 X: 카드 테이블에서 동일한 카테고리의 포지션 값들중 최솟값을 가지고 와서 그 값의 절반을 넣습니다.
	앞 X 뒤 O: 카드 테이블에서 동일한 카테고리의 포지션 값들중 최댓값을 가지고 와서 그 값에 갭밸류를 더해 넣습니다.
	->
	앞 O 뒤 X: 앞 카드의 포지션을 가지고 와서 그 값의 절반을 넣습니다.
	앞 X 뒤 O: 뒤 카드의 포지션을 가지고 와서 그 값에 갭밸류를 더해서 넣습니다.
	변경 사유:
	이전 방법에서는 DB에서 값을 다 탐색하고 최댓값, 최솟값을 가져와야 하는데 그것보다 아이디로 탐색하는게 시간이 적게 걸릴 것 같습니다.
	또한 이전 방법에서는 아이디가 필요 없는데 바꾼 방법에서는 아이디를 사용합니다.

	X
	카드
	최신
	 */

}
