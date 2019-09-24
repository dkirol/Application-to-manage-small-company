package pl.managecompany.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import pl.managecompany.dto.AccountDto;
import pl.managecompany.model.Account;
import pl.managecompany.service.AccountService;

import java.util.Set;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private AccountService accountService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        final Account account = accountService.login(authentication.getName(), (String) authentication.getCredentials());

        final UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(
                        account.getLogin(), "", Set.of(new SimpleGrantedAuthority("ADMIN")));

        usernamePasswordAuthenticationToken.setDetails(accountToDtoMapper(account));

        return usernamePasswordAuthenticationToken;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

    private AccountDto accountToDtoMapper(Account account) {
        return AccountDto.builder()
                .id(account.getId())
                .login(account.getLogin())
                .build();
    }
}
