package fr.loan.bibliotheque.Authentication;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDto {
    String firstName;
    String lastName;
    String email;
    String password;
}
