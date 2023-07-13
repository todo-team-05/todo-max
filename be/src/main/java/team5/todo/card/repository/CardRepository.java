package team5.todo.card.repository;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import team5.todo.domain.Card;

@Repository
public class CardRepository {
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
}
