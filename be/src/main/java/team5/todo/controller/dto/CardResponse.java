package team5.todo.controller.dto;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import team5.todo.domain.Card;

public class CardResponse {

	private final Long id;
	private final Long categoryId;
	private final String title;
	private final String contents;

	public static class Builder {

		private Long id;
		private Long categoryId;
		private String title;
		private String contents;

		public Builder() {
		}

		public Builder id(Long id) {
			this.id = id;
			return this;
		}

		public Builder categoryId(Long categoryId) {
			this.categoryId = categoryId;
			return this;
		}

		public Builder title(String title) {
			this.title = title;
			return this;
		}

		public Builder contents(String contents) {
			this.contents = contents;
			return this;
		}

		public CardResponse build() {
			return new CardResponse(this);
		}
	}

	private CardResponse(Builder builder) {
		this.id = builder.id;
		this.categoryId = builder.categoryId;
		this.title = builder.title;
		this.contents = builder.contents;
	}

	public static Map<Long, List<CardResponse>> from(List<Card> cards) {
		return cards.stream()
			.map(CardResponse::from)
			.collect(Collectors.collectingAndThen(
				Collectors.groupingBy(CardResponse::getCategoryId),
				Collections::unmodifiableMap
			));
	}

	public static CardResponse from(Card card) {
		return new Builder()
			.id(card.getId())
			.categoryId(card.getCategoryId())
			.title(card.getTitle())
			.contents(card.getContents())
			.build();
	}

	public Long getId() {
		return id;
	}

	public Long getCategoryId() {
		return categoryId;
	}

	public String getTitle() {
		return title;
	}

	public String getContents() {
		return contents;
	}
}
