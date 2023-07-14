package team5.todo.repository;

import static org.assertj.core.api.Assertions.*;

import java.util.List;

import javax.sql.DataSource;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import team5.todo.annotation.RepositoryTest;
import team5.todo.domain.Card;

@RepositoryTest
public class CardRepositoryTest {

	private final CardRepository cardRepository;
	private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

	@Autowired
	public CardRepositoryTest(DataSource dataSource) {
		this.cardRepository = new CardRepository(dataSource);
		this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
	}

	@Test
	@DisplayName("저장되어 있는 모든 카드를 포지션 값이 큰거부터 반환한다")
	void findAllTest() {
		//given
		//when
		List<Card> actualCards = cardRepository.findAll();
		//then
		assertThat(actualCards.size()).isEqualTo(3);

		assertThat(actualCards.get(0).getId()).isEqualTo(3);
		assertThat(actualCards.get(0).getPosition()).isEqualTo(3000);
		assertThat(actualCards.get(0).getTitle()).isEqualTo("제목3");
		assertThat(actualCards.get(0).getContents()).isEqualTo("내용3");

		assertThat(actualCards.get(1).getId()).isEqualTo(2);
		assertThat(actualCards.get(1).getPosition()).isEqualTo(2000);
		assertThat(actualCards.get(1).getTitle()).isEqualTo("제목2");
		assertThat(actualCards.get(1).getContents()).isEqualTo("내용2");

		assertThat(actualCards.get(2).getId()).isEqualTo(1);
		assertThat(actualCards.get(2).getPosition()).isEqualTo(1000);
		assertThat(actualCards.get(2).getTitle()).isEqualTo("제목1");
		assertThat(actualCards.get(2).getContents()).isEqualTo("내용1");

	}

	@Test
	@DisplayName("테스트 데이터가 card 테이블에 저장된다.")
	void saveCardTest(){
		//given
		String testTitle = "save test1";
		String testContents = "save test contents";
		Card card = Card.builder()
				.categoryId(1L)
				.title(testTitle)
				.contents(testContents)
				.build();
		String sql = "SELECT IFNULL(MAX(position), 0) FROM card WHERE category_id = 1";
		Double maxPosition = namedParameterJdbcTemplate.queryForObject(sql,new MapSqlParameterSource(), Double.class);

		//when
		Long saveResultId = cardRepository.save(card);

		//then
		Card actual = cardRepository.findById(saveResultId);
		Assertions.assertAll(
				() -> Assertions.assertEquals(1L, actual.getCategoryId()),
				() -> Assertions.assertEquals(maxPosition + 1000, actual.getPosition()),
				() -> Assertions.assertEquals(testTitle, actual.getTitle()),
				() -> Assertions.assertEquals(testContents, actual.getContents())
		);
	}

	@Test
	@DisplayName("카드를 저장했을 때, 저장한 카드가 삭제된다.")
	void deleteCardTest() {
		Card card = Card.builder()
				.categoryId(1L)
				.title("save test1")
				.contents("save test contents")
				.build();
		Long saveResultId = cardRepository.save(card);

		cardRepository.delete(Card.builder().id(saveResultId).build());

		assertThatThrownBy(() -> cardRepository.findById(saveResultId))
				.isInstanceOf(EmptyResultDataAccessException.class);
	}

	@Test
	@DisplayName("카드를 저장했을 때, 저장한 카드를 수정하면 수정된 데이터가 db에 반영된다.")
	void updateCardTest(){
		//given
		Card original = Card.builder()
				.categoryId(1L)
				.title("original title")
				.contents("original contents")
				.build();
		Long saveResultId = cardRepository.save(original);

		String expectedTitle = "new title";
		String expectedContents = "new contents";
		Card updateRequest = Card.builder()
				.id(saveResultId)
				.title(expectedTitle)
				.contents(expectedContents)
				.build();

		//when
		cardRepository.modify(updateRequest);

		//then
		Card actual = cardRepository.findById(saveResultId);
		Assertions.assertAll(
				() -> Assertions.assertEquals(expectedTitle, actual.getTitle()),
				() -> Assertions.assertEquals(expectedContents, actual.getContents())
		);
	}
}