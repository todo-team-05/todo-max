package team5.todo.domain;

public class Card {

	private final Long id;
	private final Long categoryId;
	private final Double position;
	private final String title;
	private final String contents;

	public static class Builder {

		private Long id;
		private Long categoryId;
		private Double position;
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

		public Builder position(Double position) {
			this.position = position;
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

		public Card build() {
			return new Card(this);
		}
	}

	private Card(Builder builder) {
		this.id = builder.id;
		this.categoryId = builder.categoryId;
		this.position = builder.position;
		this.title = builder.title;
		this.contents = builder.contents;
	}

	public static Builder builder() {
		return new Builder();
	}

	public Long getId() {
		return id;
	}

	public Long getCategoryId() {
		return categoryId;
	}

	public Double getPosition() {
		return position;
	}

	public String getTitle() {
		return title;
	}

	public String getContents() {
		return contents;
	}
}
