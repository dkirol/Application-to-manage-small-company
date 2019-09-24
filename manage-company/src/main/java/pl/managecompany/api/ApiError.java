package pl.managecompany.api;

import lombok.Data;

@Data
public class ApiError {
    private int code;
    private String message;

    public ApiError(ApiErrorCode apiErrorCode) {
        super();
        this.code = apiErrorCode.codeNumber;
    }

    public ApiError(ApiErrorCode apiErrorCode, String message) {
        super();
        this.code = apiErrorCode.codeNumber;
        this.message = message;
    }
}
