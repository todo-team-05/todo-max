package team5.todo.repository;

import static org.assertj.core.api.Assertions.*;

import java.util.List;

import javax.sql.DataSource;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import team5.todo.annotation.RepositoryTest;
import team5.todo.card.repository.CardRepository;
import team5.todo.domain.Card;

@RepositoryTest
public class CardRepositoryTest {

	private final CardRepository cardRepository;

	@Autowired
	public CardRepositoryTest(DataSource dataSource) {
		this.cardRepository = new CardRepository(dataSource);
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
}
