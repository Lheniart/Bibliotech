package fr.loan.bibliotheque.Book;

import fr.loan.bibliotheque.Categories.Categories;
import fr.loan.bibliotheque.Page.Page;
import fr.loan.bibliotheque.User.Dto.SimpleUserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookOut {

    private Integer id;
    private String title;
    private String resume;
    private String image;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private final List<Page> pages = new ArrayList<>();
    private List<Categories> categories = new ArrayList<>();
    private List<SimpleUserDTO> users;
}
