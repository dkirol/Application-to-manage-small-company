package pl.managecompany.security;

import lombok.Data;
import org.springframework.security.core.AuthenticationException;
import pl.managecompany.api.ApiErrorCode;
import pl.managecompany.api.ApiErrorProvider;

@Data
public class CustomAuthenticationException extends AuthenticationException implements ApiErrorProvider {
    private ApiErrorCode apiErrorCode;
    private String apiErrorMessage;

    public CustomAuthenticationException(ApiErrorCode apiErrorCode, String apiErrorMessage) {
        super(apiErrorMessage);
        this.apiErrorCode = apiErrorCode;
        this.apiErrorMessage = apiErrorMessage;
    }
}
