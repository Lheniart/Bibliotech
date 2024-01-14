package fr.loan.bibliotheque.Book;

import fr.loan.bibliotheque.Categories.Categories;
import fr.loan.bibliotheque.Page.Page;
import fr.loan.bibliotheque.User.User;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookDto {

    private String title;
    private String resume;
    private String image;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private final List<Page> pages = new ArrayList<>();
    private final List<Categories> categories = new ArrayList<>();
    private final List<User> users = new ArrayList<>();

}
