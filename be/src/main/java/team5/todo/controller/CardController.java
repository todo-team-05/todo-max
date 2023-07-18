package team5.todo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import team5.todo.controller.dto.CardModifyRequest;
import team5.todo.controller.dto.CardMoveRequest;
import team5.todo.controller.dto.CardSaveRequest;
import team5.todo.service.CardService;
import team5.todo.service.HistoryService;

@RestController
@RequestMapping("/card")
public class CardController {

	private final CardService cardService;
	private final HistoryService historyService;

	@Autowired
	public CardController(CardService cardService, HistoryService historyService) {
		this.cardService = cardService;
		this.historyService = historyService;
	}

	@PostMapping
	public void save(@RequestBody final CardSaveRequest cardSaveRequest) {
		cardService.save(cardSaveRequest);
		historyService.createHistory(cardSaveRequest);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable final long id) {
		cardService.delete(id);
		historyService.createHistory(id);
	}

	@PutMapping("/modify")
	public void modify(@RequestBody final CardModifyRequest cardModifyRequest) {
		cardService.modify(cardModifyRequest);
		historyService.createHistory(cardModifyRequest);

	}

	@PutMapping("/move")
	public void move(@RequestBody final CardMoveRequest cardMoveRequest) {
		historyService.createHistory(cardMoveRequest);
		cardService.move(cardMoveRequest);
	}
}
