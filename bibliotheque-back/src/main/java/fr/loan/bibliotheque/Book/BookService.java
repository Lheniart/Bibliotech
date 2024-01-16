package fr.loan.bibliotheque.Book;

import fr.loan.bibliotheque.Categories.Categories;
import fr.loan.bibliotheque.Categories.CategoriesRepository;
import fr.loan.bibliotheque.Categories.CategoriesService;
import fr.loan.bibliotheque.Role.Role;
import fr.loan.bibliotheque.Role.RoleRepository;
import fr.loan.bibliotheque.User.Dto.SimpleUserDTO;
import fr.loan.bibliotheque.User.User;
import fr.loan.bibliotheque.User.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookService {


    private final BookRepository bookRepository;
    private final CategoriesRepository categoriesRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    public List<BookOut> getBooks() {
        List<Book> books = bookRepository.findAll();

        return books.stream()
                .map(book -> new BookOut(
                        book.getTitle(),
                        book.getResume(),
                        book.getImage(),
                        book.getCreatedAt(),
                        book.getUpdatedAt(),
                        book.getCategories(),
                        convertToSimpleUserDTOs(book.getUsers())))
                .collect(Collectors.toList());
    }
    private List<SimpleUserDTO> convertToSimpleUserDTOs(List<User> users) {
        return users.stream()
                .map(user -> new SimpleUserDTO(user.getId() /*, autres champs dont vous avez besoin */))
                .collect(Collectors.toList());
    }

    public Mono<BookOut> getBookById(Integer id){
        Book book =  bookRepository.findById(id).orElseThrow(null);
        return Mono.justOrEmpty(book)
                .map(book1 -> new BookOut(
                        book1.getTitle(),
                        book1.getResume(),
                        book1.getImage(),
                        book1.getCreatedAt(),
                        book1.getUpdatedAt(),
                        book.getCategories()
                        ,convertToSimpleUserDTOs(book1.getUsers())));
    }

    public Mono<Book> createBook(BookDto bookDto){
        List<Categories> categories = bookDto.getCategories();
        List<Integer> categoriesId = categories.stream()
                .map(Categories::getId)
                .toList();
        categories = categoriesRepository.findAllById(categoriesId);

        List<User> users = bookDto.getUsers();
        List<Integer> usersId = users.stream()
                .map(User::getId)
                .toList();
        Date date = new Date();
        LocalDateTime localDateTime = date.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
        users = userRepository.findAllById(usersId);
        Book book = new Book(
                bookDto.getTitle(),
                bookDto.getResume(),
                bookDto.getImage(),
                localDateTime,
                localDateTime,
                categories,
                users
        );
        return Mono.just(bookRepository.save(book));
    }

    public Mono<Book> updateBook(Integer id, BookDto bookDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.isAuthenticated()) {
            org.springframework.security.core.userdetails.User principal =
                    (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
            Optional<User> optionalUser  = userRepository.findByEmail(principal.getUsername());
            User currentUser = optionalUser.orElse(null);
            Date date = new Date();
            LocalDateTime localDateTime = date.toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDateTime();
            return Mono.justOrEmpty(bookRepository.findById(id))
                    .flatMap(existingBook -> {
                        // Vérifier si l'utilisateur actuel est le propriétaire du livre ou un administrateur
                        assert currentUser != null;
                        if (currentUser.getRoles().contains("ADMIN") || existingBook.getUsers().contains(currentUser)) {
                            // Mettre à jour les propriétés du livre avec les nouvelles valeurs
                            existingBook.setTitle(bookDto.getTitle());
                            existingBook.setResume(bookDto.getResume());
                            existingBook.setImage(bookDto.getImage());
                            existingBook.setCreatedAt(existingBook.getCreatedAt());
                            existingBook.setUpdatedAt(localDateTime);

                            // Enregistrer les modifications dans la base de données
                            return Mono.just(bookRepository.save(existingBook));
                        } else {
                            // L'utilisateur actuel n'est pas autorisé à modifier ce livre
                            return Mono.error(new ResponseStatusException(HttpStatus.FORBIDDEN));
                        }
                    });
        } else {
            // L'utilisateur n'est pas authentifié
            return Mono.error(new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        }
    }


    public ResponseEntity<String> deleteBookById(Integer id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.isAuthenticated()){
            org.springframework.security.core.userdetails.User principal =
                    (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
            Optional<User> optionalUser  = userRepository.findByEmail(principal.getUsername());
            User currentUser = optionalUser.orElse(null);
            Book book = bookRepository.findById(id).orElse(null);
            Role admin = roleRepository.findByName("ADMIN").orElseThrow(null);
            if (bookRepository.existsById(id)){
                if (currentUser.getRoles().contains(admin) || book.getUsers().contains(currentUser)){

                    try {
                        bookRepository.deleteById(id);
                        return new ResponseEntity<>("Book " + id + " is deleted", HttpStatus.OK);
                    }
                    catch (Exception e){
                        return new ResponseEntity<>("Book " + id + " not deleted", HttpStatus.BAD_REQUEST);
                    }
                }
                return new ResponseEntity<>("Unauthorized", HttpStatus.FORBIDDEN);
            }

            return new ResponseEntity<>("Book " + id + " not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("Not authenticated", HttpStatus.UNAUTHORIZED);

    }

    public Book addCategoriesForBook(Integer bookId, List<Integer> categoriesId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.isAuthenticated()){
            Book book = bookRepository.findById(bookId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

            org.springframework.security.core.userdetails.User principal =
                    (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
            Optional<User> optionalUser  = userRepository.findByEmail(principal.getUsername());
            User currentUser = optionalUser.orElse(null);
            Role admin = roleRepository.findByName("ADMIN").orElseThrow(null);
            if (currentUser.getRoles().contains(admin) || book.getUsers().contains(currentUser)){
                List<Categories> categories = categoriesRepository.findAllById(categoriesId);
                book.setCategories(categories);

                return bookRepository.save(book);
            }

            throw new ResponseStatusException(HttpStatus.FORBIDDEN);

        }
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    public Book addUsersForBook(Integer bookId, List<Integer> usersId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()){
            Book book = bookRepository.findById(bookId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

            org.springframework.security.core.userdetails.User principal =
                    (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
            Optional<User> optionalUser  = userRepository.findByEmail(principal.getUsername());
            User currentUser = optionalUser.orElse(null);
            Role admin = roleRepository.findByName("ADMIN").orElseThrow(null);
            if (currentUser.getRoles().contains(admin) || book.getUsers().contains(currentUser)){
                List<User> users = userRepository.findAllById(usersId);

                book.setUsers(users);

                return bookRepository.save(book);
            }
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
}
