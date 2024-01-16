package fr.loan.bibliotheque.Page;

import fr.loan.bibliotheque.Book.Book;
import fr.loan.bibliotheque.Book.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Service
@RequiredArgsConstructor
public class PageService {

    private final PageRepository pageRepository;
    private final BookRepository bookRepository;
    public List<Page> getPages(){
        return pageRepository.findAll();
    }

    public Mono<Page> getPageById(Integer id){
        return Mono.justOrEmpty(pageRepository.findById(id));
    }

    public Mono<Page> createPage(PageDto pageDto){
        Optional<Book> book = bookRepository.findById(pageDto.getBooks().getId());
        Date date = new Date();
        LocalDateTime localDateTime = date.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
        if (book.isPresent()){
            Page page = new Page(
                    pageDto.getTitle(),
                    pageDto.getContent(),
                    localDateTime,
                    localDateTime,
                    book.get()
            );
            return Mono.just(pageRepository.save(page));
        }
        else {
            return Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND,"Book Not found"));
        }

    }

    public Mono<Page> updatePage(Integer id, PageDto pageDto){
        Date date = new Date();
        LocalDateTime localDateTime = date.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
        Page currentPage = pageRepository.findById(id).orElseThrow(null);
        Page page = new Page(
                id,
                pageDto.getTitle(),
                pageDto.getContent(),
                currentPage.getCreatedAt(),
                localDateTime,
                pageDto.getBooks()
        );
        return Mono.just(pageRepository.save(page));
    }

    public ResponseEntity<String> deletePage(Integer id){
        if (pageRepository.existsById(id)){
            try {
                pageRepository.deleteById(id);
                return new ResponseEntity<>("Page " + id + " is deleted", HttpStatus.OK);
            }
            catch (Exception e){
                return new ResponseEntity<>("Page " + id + " not deleted", HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>("Page " + id + " not found", HttpStatus.NOT_FOUND);
    }
}
