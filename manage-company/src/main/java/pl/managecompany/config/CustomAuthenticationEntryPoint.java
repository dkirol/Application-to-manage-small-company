package pl.managecompany.config;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import pl.managecompany.api.ApiError;
import pl.managecompany.api.ApiErrorCode;
import pl.managecompany.security.CustomAuthenticationException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {

        final ApiError apiError;
        final ApiErrorCode apiErrorCode;
        if (authException instanceof InsufficientAuthenticationException) {
            apiErrorCode = ApiErrorCode.InvalidEmailOrPassword;
            apiError = new ApiError(apiErrorCode, "Insufficient authentication data");
        } else {
            final CustomAuthenticationException exception = (CustomAuthenticationException) authException;
            apiErrorCode = exception.getApiErrorCode();
            apiError = new ApiError(apiErrorCode, exception.getApiErrorMessage());
        }

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(apiErrorCode.httpStatus.value());

        final ObjectMapper mapper = new ObjectMapper();
        final String json = mapper.writeValueAsString(apiError);
        final PrintWriter out = response.getWriter();

        out.print(json);
        out.flush();
    }
}
