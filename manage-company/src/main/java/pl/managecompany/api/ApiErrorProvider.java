package pl.managecompany.api;

public interface ApiErrorProvider {
    ApiErrorCode getApiErrorCode();

    String getApiErrorMessage();
}
