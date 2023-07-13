package team5.todo.controller;

import org.springframework.web.bind.annotation.*;
import team5.todo.controller.dto.CardDeleteRequest;
import team5.todo.controller.dto.CardSaveRequest;
import team5.todo.service.CardService;
import team5.todo.repository.CardRepository;

@RestController
@RequestMapping("/card")
public class CardController {

    private final CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping
    public void save(@RequestBody final CardSaveRequest cardSaveRequest) {
        cardService.save(cardSaveRequest);
    }
    
    @DeleteMapping
    public void delete(@RequestBody final CardDeleteRequest cardDeleteRequest) {
        cardService.delete(cardDeleteRequest);
    }
}
