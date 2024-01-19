package fr.loan.bibliotheque.Page;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import fr.loan.bibliotheque.Book.Book;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Page")
public class Page {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "content", columnDefinition="TEXT")
    private String content;

    @Column(name = "createdAt")
    private LocalDateTime createdAt;

    @Column(name = "updatedAt")
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    public Page(String title, String content, LocalDateTime createdAt, LocalDateTime updatedAt, Book book) {
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.book = book;
    }

    public Page(Book book) {
        Date date = new Date();
        LocalDateTime localDateTime = date.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
        this.title = "Première page";
        this.content = "";
        this.createdAt = localDateTime;
        this.updatedAt = localDateTime;
        this.book = book;
    }
}
