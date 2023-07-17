package team5.todo.controller.dto;

import team5.todo.domain.Card;

public class CardModifyRequest {

    private final Long id;
    private final String title;
    private final String contents;

    public static class Builder {

        private Long id;
        private String title;
        private String contents;

        private Builder() {}

        public Builder id(Long id) {
            this.id= id;
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

        public CardModifyRequest build() {
            return new CardModifyRequest(this);
        }
    }

    private CardModifyRequest(Long id, String title, String contents) {
        this.id = id;
        this.title = title;
        this.contents = contents;
    }

    private CardModifyRequest(Builder builder) {
        this.id = builder.id;
        this.title = builder.title;
        this.contents = builder.contents;
    }
    
    public static Builder builder() {
        return new Builder();
    }

    public Card toCard() {
        return Card.builder()
                .id(id)
                .title(title)
                .contents(contents)
                .build();
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContents() {
        return contents;
    }
}
