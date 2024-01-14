package fr.loan.bibliotheque.Authentication;

import fr.loan.bibliotheque.Role.RoleRepository;
import fr.loan.bibliotheque.User.Dto.LoginDto;
import fr.loan.bibliotheque.User.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto){
        return  authService.login(loginDto);
    }


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        return authService.register(registerDto);
    }

    @GetMapping("/test")
    @PreAuthorize("hasAuthority('USER')")
    public String test(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            // L'utilisateur est authentifié
            String username = authentication.getName();
            return username;
            // Faites quelque chose avec le nom d'utilisateur ou d'autres détails d'authentification
        }
        return "";
    }
}
