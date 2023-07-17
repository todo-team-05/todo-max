package team5.todo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import team5.todo.controller.dto.CardMoveRequest;
import team5.todo.controller.dto.CardSaveRequest;
import team5.todo.controller.dto.CardModifyRequest;
import team5.todo.service.CardService;

@RestController
@RequestMapping("/card")
public class CardController {

    private final CardService cardService;

    @Autowired
    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping
    public void save(@RequestBody final CardSaveRequest cardSaveRequest) {
        cardService.save(cardSaveRequest);
    }
    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable final long id) {
        cardService.delete(id);
    }

    @PutMapping("/modify")
    public void modify(@RequestBody final CardModifyRequest cardModifyRequest) {
        cardService.modify(cardModifyRequest);
    }

    @PutMapping("/move")
    public void move(@RequestBody final CardMoveRequest cardMoveRequest) {
        cardService.move(cardMoveRequest);
    }
}
