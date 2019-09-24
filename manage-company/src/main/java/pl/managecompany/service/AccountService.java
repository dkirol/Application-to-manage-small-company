package pl.managecompany.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.managecompany.model.Account;
import pl.managecompany.repository.AccountRepository;

import javax.transaction.Transactional;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@Service
public class AccountService {
    private static final Logger logger = LogManager.getLogger(AccountService.class);
    private static final byte[] SALT_KEY = {'P', 'v', 'q', 'e', 'r', 'v', '8', '7', '4', '3', 't', 'k', 'j', 'b', '2', '4', '3', 'u', '8', '3', '4'};

    @Autowired
    private AccountRepository accountRepository;

    @Transactional
    public Account login(String login, String password) {
        return findAccount(login, password);
    }

    public Account findAccount(String login, String explicitPassword) {
        String hashedPassword = hashPassword(explicitPassword);

        Optional<Account> account = accountRepository.findAccountByLoginAndPassword(login, explicitPassword);

        if (account.isPresent()) {
            return account.get();
        }
        throw new NotFoundException();
    }

    @Transactional
    public boolean changePassword(Account account, String oldPassword, String newPassword) {
        try {
            final Account dbAccount = findAccount(account.getLogin(), oldPassword);

            dbAccount.setPassword(hashPassword(newPassword));
            accountRepository.save(dbAccount);

            return true;
        } catch (Exception ex) {
            logger.error(ex, ex);
        }
        return false;
    }

    private String hashPassword(String explicitPassword) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            digest.reset();
            digest.update(SALT_KEY);

            return bytesToHex(digest.digest(passwordToBytes(explicitPassword)));
        } catch (NoSuchAlgorithmException nsaEx) {
            logger.error(nsaEx, nsaEx);
        }
        return null;
    }

    private String bytesToHex(byte[] hashInBytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : hashInBytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }

    private byte[] passwordToBytes(String password) {
        return password.getBytes(StandardCharsets.UTF_8);
    }
}

