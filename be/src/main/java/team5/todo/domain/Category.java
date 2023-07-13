package team5.todo.domain;

public class Category {

	private final Long id;
	private final String name;

	public static class Builder {

		private Long id;
		private String name;

		public Builder() {
		}

		public Builder id(Long id) {
			this.id = id;
			return this;
		}

		public Builder name(String name) {
			this.name = name;
			return this;
		}

		public Category build() {
			return new Category(this);
		}
	}

	private Category(Builder builder) {
		this.id = builder.id;
		this.name = builder.name;
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

}
