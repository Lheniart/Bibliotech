package fr.loan.bibliotheque.Book;

import fr.loan.bibliotheque.User.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/book")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("")
    public ResponseEntity<List<BookOut>> getBooks() {
        List<BookOut> books = bookService.getBooks();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mono<BookOut>>getBookById(@PathVariable Integer id){
        Mono<BookOut> book = bookService.getBookById(id)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.BAD_REQUEST)));
        return new ResponseEntity<>(book, HttpStatus.OK);
    }


    @PostMapping("")
    public Mono<Book> createBook(@RequestBody BookDto bookDto){
        return bookService.createBook(bookDto)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.BAD_REQUEST)));
    }

    @PutMapping("/{id}")
    public Mono<Book> updateBook(@PathVariable Integer id ,@RequestBody BookDto bookDto){
        return bookService.updateBook(id, bookDto)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.BAD_REQUEST)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBookById(@PathVariable Integer id){
        return bookService.deleteBookById(id);
    }


    @PostMapping("/{bookId}/categories")
    public ResponseEntity<Book> addCategoriesForBook(@PathVariable Integer bookId, @RequestBody List<Integer> categoriesId){
        Book book = bookService.addCategoriesForBook(bookId, categoriesId);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @PostMapping("/{bookId}/users")
    public ResponseEntity<Book> addUsersForBook(@PathVariable Integer bookId, @RequestBody List<Integer> usersId){
        Book book = bookService.addUsersForBook(bookId, usersId);

        return new ResponseEntity<>(book, HttpStatus.OK);
    }



    

}
