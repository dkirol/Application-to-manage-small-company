package pl.managecompany.api;

import org.springframework.http.HttpStatus;

public enum ApiErrorCode {
    NotAuthenticated(100, HttpStatus.FORBIDDEN),
    Unauthorized(110, HttpStatus.UNAUTHORIZED),
    InvalidEmailOrPassword(115, HttpStatus.FORBIDDEN),
    OldPasswordInvalid(116, HttpStatus.FORBIDDEN),
    UserNotActive(120, HttpStatus.FORBIDDEN),
    InvalidParameters(200, HttpStatus.BAD_REQUEST);

    public final int codeNumber;
    public final HttpStatus httpStatus;

    ApiErrorCode(int codeNumber, HttpStatus httpStatus) {
        this.codeNumber = codeNumber;
        this.httpStatus = httpStatus;
    }
}
