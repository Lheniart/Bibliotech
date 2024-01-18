package fr.loan.bibliotheque.User;

import fr.loan.bibliotheque.Book.Book;
import fr.loan.bibliotheque.Book.BookRepository;
import fr.loan.bibliotheque.Role.Role;
import fr.loan.bibliotheque.Role.RoleRepository;
import fr.loan.bibliotheque.User.Dto.ResetPassDto;
import fr.loan.bibliotheque.User.Dto.UpdateUserDto;
import fr.loan.bibliotheque.User.Dto.UserDto;
import fr.loan.bibliotheque.User.Dto.UserOut;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public List<UserOut> getUsers() {
            List<User> users = userRepository.findAll();
            List<UserOut> usersOut = users.stream()
                    .map(user -> new UserOut(
                            user.getId(),
                            user.getFirstName(),
                            user.getLastName(),
                            user.getEmail(),
                            user.getRoles()
                    ))
                    .collect(Collectors.toList());
            return usersOut;
    }

    public Mono<UserOut> getUserById(Integer id) {
        return Mono.justOrEmpty(userRepository.findById(id))
                .map(user -> new UserOut(
                        user.getId(),
                        user.getFirstName(),
                        user.getLastName(),
                        user.getEmail(),
                        user.getRoles()
                ));
    }
    public Mono<UserOut> createUser(UserDto userDto) {
        User user = new User(
                userDto.getFirstName(),
                userDto.getLastName(),
                userDto.getEmail(),
                passwordEncoder.encode(userDto.getPassword())
        );
        return Mono.just(userRepository.save(user))
                .map(user1 -> new UserOut(
                        user1.getId(),
                        user1.getFirstName(),
                        user1.getLastName(),
                        user1.getEmail(),
                        user1.getRoles()
                ));

    }

    public Mono<UserOut> updateUser(Integer id, UpdateUserDto userDto) {
        Optional<User> optionalInitialUser = userRepository.findById(id);

        if (optionalInitialUser.isPresent()) {
            User initialUser = optionalInitialUser.get();

            User user = new User(
                    id,
                    userDto.getFirstName(),
                    userDto.getLastName(),
                    userDto.getEmail(),
                    initialUser.getPassword(),
                    initialUser.getRoles()
            );

            return Mono.just(userRepository.save(user))
                    .map(user1 -> new UserOut(
                            user1.getId(),
                            user1.getFirstName(),
                            user1.getLastName(),
                            user1.getEmail(),
                            user1.getRoles()
                    ));
            // Gérer le cas où l'utilisateur initial n'est pas trouvé

        } else{
            return Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND));
        }

    }
    public Mono<UserOut> resetPassword(Integer id, ResetPassDto resetPassDto){
        Optional<User> optionalInitialUser = userRepository.findById(id);

        if (optionalInitialUser.isPresent()) {
            User initialUser = optionalInitialUser.get();

            User user = new User(
                    id,
                    initialUser.getFirstName(),
                    initialUser.getLastName(),
                    initialUser.getEmail(),
                    passwordEncoder.encode(resetPassDto.getPassword()),
                    initialUser.getRoles()
            );

            return Mono.just(userRepository.save(user))
                    .map(user1 -> new UserOut(
                            user1.getId(),
                            user1.getFirstName(),
                            user1.getLastName(),
                            user1.getEmail(),
                            user1.getRoles()
                    ));
        } else{
            return Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND));
        }
    }

    public ResponseEntity<String> deleteUser(Integer id) {
        if (userRepository.existsById(id)){
            try {
                List<Book> booksWithUser = bookRepository.findByUsers_Id(id);
                for (Book book : booksWithUser) {
                    book.getUsers().removeIf(user -> user.getId().equals(id));
                    bookRepository.save(book);
                }
                userRepository.deleteById(id);
                return new ResponseEntity<>("User " + id + " is deleted", HttpStatus.OK);
            }
            catch (Exception e){
                return new ResponseEntity<>("User " + id + " not deleted", HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>("User " + id + " not found", HttpStatus.NOT_FOUND);
    }

    public Mono<User> updateUserRoles(Integer userId, List<Integer> roleIds) {
        User currentUser = userRepository.findById(userId)
                .orElseThrow();
        return Mono.just(currentUser)
                .flatMap(user -> {
                    // Récupérer les objets de rôle à partir des IDs
                    List<Role> roles = roleRepository.findAllById(roleIds);

                    // Mettre à jour les rôles de l'utilisateur
                    user.setRoles(roles);

                    // Enregistrer les modifications dans la base de données
                    return Mono.just(userRepository.save(user));
                })
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur non trouvé")));
    }

}
