package team5.todo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import team5.todo.controller.dto.CategoryResponse;
import team5.todo.service.CategoryService;

@RestController
public class CategoryController {

	private final CategoryService categoryService;

	public CategoryController(CategoryService categoryService) {
		this.categoryService = categoryService;
	}

	@GetMapping("/index")
	public List<CategoryResponse> getCategories() {
		return categoryService.getAllCategories();
	}
}
