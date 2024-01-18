package fr.loan.bibliotheque.Page;

import fr.loan.bibliotheque.Book.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PageRepository extends JpaRepository<Page, Integer> {
    void deleteById(Integer id);

    List<Page> findByBook_Id(Integer id);
}
