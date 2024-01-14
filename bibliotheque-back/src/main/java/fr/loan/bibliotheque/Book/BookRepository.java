package fr.loan.bibliotheque.Book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    void deleteById(Integer id);
    List<Book> findByCategories_Id(Integer id);
    List<Book> findByUsers_Id(Integer id);

}
