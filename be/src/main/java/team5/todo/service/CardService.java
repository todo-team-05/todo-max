package team5.todo.service;

import org.springframework.stereotype.Service;
import team5.todo.controller.dto.CardDeleteRequest;
import team5.todo.controller.dto.CardSaveRequest;
import team5.todo.repository.CardRepository;

@Service
public class CardService {

    private final CardRepository cardRepository;

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public void save(CardSaveRequest cardSaveRequest) {
        cardRepository.save(cardSaveRequest.toCard());
    }

    public void delete(CardDeleteRequest cardDeleteRequest) {
        cardRepository.deleteById(cardDeleteRequest.getId());
    }
}
