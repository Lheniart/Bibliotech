package fr.loan.bibliotheque.Authentication;

import fr.loan.bibliotheque.Role.RoleRepository;
import fr.loan.bibliotheque.Security.JwtGenerator;
import fr.loan.bibliotheque.User.Dto.LoginDto;
import fr.loan.bibliotheque.User.User;
import fr.loan.bibliotheque.User.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@AllArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;


    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto){
        return  authService.login(loginDto);
    }


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        return authService.register(registerDto);
    }

   @PostMapping("/validToken")
    public ResponseEntity<Mono<User>> validateToken(@RequestBody String token){
        Mono<User> user = authService.validateToken(token);
        return new ResponseEntity<>(user, HttpStatus.OK);
   }
}
