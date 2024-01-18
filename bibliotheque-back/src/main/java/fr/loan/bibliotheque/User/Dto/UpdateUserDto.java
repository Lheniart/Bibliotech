package fr.loan.bibliotheque.User.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserDto {

    private String firstName;
    private String lastName;
    private String email;

}
