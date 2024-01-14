package fr.loan.bibliotheque.Categories;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoriesController {

    private final CategoriesService categoriesService;

    public CategoriesController(CategoriesService categoriesService) {
        this.categoriesService = categoriesService;
    }

    @GetMapping("")
    public List<Categories> getCategories(){
        return categoriesService.getCategories();
    }

    @GetMapping("/{id}")
    public Mono<Categories> getCategoryById(@PathVariable Integer id){
        return categoriesService.getCategoryById(id)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.BAD_REQUEST)));
    }

    @PostMapping("")
    public Mono<Categories> createCategory(@RequestBody CategoriesDto categoriesDto){
        return categoriesService.createCategory(categoriesDto)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.BAD_REQUEST)));
    }

    @PutMapping("/{id}")
    public Mono<Categories> updateCategory(@PathVariable Integer id, @RequestBody CategoriesDto categoriesDto){
        return categoriesService.updateCategory(id, categoriesDto)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.BAD_REQUEST)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Integer id){
        return categoriesService.deleteCategory(id);
    }


}
