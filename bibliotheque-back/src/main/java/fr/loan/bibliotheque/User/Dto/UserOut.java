package fr.loan.bibliotheque.User.Dto;

import fr.loan.bibliotheque.Book.Book;
import fr.loan.bibliotheque.Role.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserOut {

    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private List<Role> roles;
}
