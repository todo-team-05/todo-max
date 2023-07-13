package team5.todo.repository;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import team5.todo.domain.Card;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
@Repository
public class CardRepository {
	private static final double gapValue = 1000D;
	private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

	public CardRepository(DataSource dataSource) {
		this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
	}

	private RowMapper<Card> cardRowMapper() {
		return (rs, rowNum) -> new Card.Builder()
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
				" IFNULL((SELECT MAX(position) FROM (SELECT * FROM card) AS sub WHERE sub.category_id = :categoryId), 0) + :gapValue, " +
				" :title, " + " :contents)";
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("categoryId", card.getCategoryId());
		params.addValue("title", card.getTitle());
		params.addValue("contents", card.getContents());
		params.addValue("gapValue", gapValue);

		KeyHolder keyHolder = new GeneratedKeyHolder();
		namedParameterJdbcTemplate.update(sql, params, keyHolder);
		return keyHolder.getKey().longValue();
	}

	public Card findById(long id){
		String sql = "SELECT id, category_id, position, title, contents FROM card WHERE id = :id";
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("id", id);
		return namedParameterJdbcTemplate.queryForObject(sql, params, cardRowMapper());
	}
}
