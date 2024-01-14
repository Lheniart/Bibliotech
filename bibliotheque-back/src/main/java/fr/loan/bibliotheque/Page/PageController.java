package fr.loan.bibliotheque.Page;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("page")
public class PageController {

    private final PageService pageService;

    public PageController(PageService pageService) {
        this.pageService = pageService;
    }

    @GetMapping("")
    public List<Page> getPages(){
        return pageService.getPages();
    }

    @GetMapping("/{id}")
    public Mono<Page> getPageById(@PathVariable Integer id){
        return pageService.getPageById(id)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.BAD_REQUEST)));
    }

    @PostMapping("")
    public Mono<Page> createPage(@RequestBody PageDto pageDto){
        return pageService.createPage(pageDto)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.BAD_REQUEST)));
    }

    @PutMapping("/{id}")
    public Mono<Page> updatePage(@PathVariable Integer id, @RequestBody PageDto pageDto){
        return pageService.updatePage(id, pageDto)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.BAD_REQUEST)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePage(@PathVariable Integer id){
        return pageService.deletePage(id);
    }

}
