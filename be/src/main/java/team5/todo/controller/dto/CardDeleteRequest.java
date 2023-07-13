package team5.todo.controller.dto;

import team5.todo.domain.Card;

public class CardDeleteRequest {

    private final Long id;

    public static class Builder {

        private Long id;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public CardDeleteRequest build() {
            return new CardDeleteRequest(this);
        }
    }

    private CardDeleteRequest(Builder builder) {
        this.id = builder.id;
    }

    public Card toCard() {
        return new Card.Builder()
                .id(id)
                .build();
    }

    public Long getId() {
        return id;
    }
}
