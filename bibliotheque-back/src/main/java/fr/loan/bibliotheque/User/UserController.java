package fr.loan.bibliotheque.User;

import fr.loan.bibliotheque.Book.Book;
import fr.loan.bibliotheque.User.Dto.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("")
    public List<UserOut> getUsers(){
        return userService.getUsers();
    }

    @GetMapping("/{id}")
    public Mono<UserOut> getUserById(@PathVariable Integer id){
        return userService.getUserById(id)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.BAD_REQUEST)));
    }

    @PostMapping("")
    public Mono<UserOut> createUser(@RequestBody UserDto userDto){
        return userService.createUser(userDto)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.UNAUTHORIZED)));
    }

    @PutMapping("/{id}")
    public Mono<UserOut> updateUser(@PathVariable Integer id, @RequestBody UpdateUserDto updateUserDto){
        return userService.updateUser(id, updateUserDto)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.BAD_REQUEST)));
    }
    @PutMapping("resetPassword/{id}")
    public Mono<UserOut> resetPassword(@PathVariable Integer id, @RequestBody ResetPassDto resetPassDto){
        return userService.resetPassword(id, resetPassDto)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.BAD_REQUEST)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer id){
        return userService.deleteUser(id);
    }

    @PostMapping("/{id}/roles")
    public Mono<User> updateUserRoles(@PathVariable Integer id, @RequestBody List<Integer> roles_id){
        return userService.updateUserRoles(id, roles_id)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.BAD_REQUEST)));
    }
}
