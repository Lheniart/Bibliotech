package fr.loan.bibliotheque.Book;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import fr.loan.bibliotheque.Categories.Categories;
import fr.loan.bibliotheque.Page.Page;
import fr.loan.bibliotheque.User.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Book")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "resume", columnDefinition="TEXT")
    private String resume;

    @Column(name = "image")
    private String image;

    @Column(name = "createdAt")
    private LocalDateTime createdAt;

    @Column(name = "updatedAt")
    private LocalDateTime updatedAt;

    @JsonIgnore
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Page> pages = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.DETACH)
    @JoinTable(
            name = "book_category",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private List<Categories> categories = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.DETACH)
    @JoinTable(
            name = "user_book",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> users = new ArrayList<>();



    public Book(Integer id, String title, String resume, String image, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.resume = resume;
        this.image = image;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Book(String title, String resume, String image, LocalDateTime createdAt, LocalDateTime updatedAt, List<Categories> categories, List<User> users) {
        this.title  = title;
        this.resume = resume;
        this.image = image;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.categories = categories;
        this.users = users;
    }
}
