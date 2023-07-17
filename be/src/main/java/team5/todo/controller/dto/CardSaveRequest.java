package team5.todo.controller.dto;

import team5.todo.domain.Card;

public class CardSaveRequest {

    private final Long categoryId;
    private final String title;
    private final String contents;

    public static class Builder {

        private Long categoryId;
        private String title;
        private String contents;

        private Builder() {}

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

        public CardSaveRequest build() {
            return new CardSaveRequest(this);
        }
    }

    private CardSaveRequest(Long categoryId, String title, String contents) {
        this.categoryId = categoryId;
        this.title = title;
        this.contents = contents;
    }

    private CardSaveRequest(Builder builder) {
        this.categoryId = builder.categoryId;
        this.title = builder.title;
        this.contents = builder.contents;
    }

    public static Builder builder() {
        return new Builder();
    }

    public Card toCard() {
        return Card.builder()
                .categoryId(categoryId)
                .title(title)
                .contents(contents)
                .build();
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
