package pl.managecompany.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.managecompany.model.Account;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, String> {
    Optional<Account> findAccountByLoginAndPassword(String login, String password);

    Optional<Account> findAccountByLogin(String login);
}
