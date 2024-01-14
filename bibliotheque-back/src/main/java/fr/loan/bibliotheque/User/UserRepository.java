package fr.loan.bibliotheque.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    void deleteById(Integer id);
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
