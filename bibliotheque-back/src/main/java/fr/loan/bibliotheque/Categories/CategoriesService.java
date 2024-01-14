package fr.loan.bibliotheque.Categories;

import fr.loan.bibliotheque.Book.Book;
import fr.loan.bibliotheque.Book.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoriesService {

    private final CategoriesRepository categoriesRepository;
    private final BookRepository bookRepository;

    public List<Categories> getCategories(){
        return categoriesRepository.findAll();
    }

    public Mono<Categories> getCategoryById(Integer id){
        return Mono.justOrEmpty(categoriesRepository.findById(id));
    }

    public Mono<Categories> createCategory(CategoriesDto categoriesDto){
        Categories categories = new Categories(
                categoriesDto.getLabel()
        );
        return Mono.just(categoriesRepository.save(categories));
    }

    public Mono<Categories> updateCategory(Integer id, CategoriesDto categoriesDto){
        Categories categories = new Categories(
                id,
                categoriesDto.getLabel()
        );
        return Mono.just(categoriesRepository.save(categories));
    }

    public ResponseEntity<String> deleteCategory(Integer id){
        if (categoriesRepository.existsById(id)){
            try {
                List<Book> booksWithCategory = bookRepository.findByCategories_Id(id);
                for (Book book : booksWithCategory) {
                    book.getCategories().removeIf(category -> category.getId().equals(id));
                    bookRepository.save(book);
                }
                categoriesRepository.deleteById(id);
                return new ResponseEntity<>("Category " + id + " is deleted", HttpStatus.OK);
            }
            catch (Exception e){
                return new ResponseEntity<>("Category " + id + " not deleted", HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>("Category " + id + " not found", HttpStatus.NOT_FOUND);

    }

}
