package pl.managecompany.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AccountDto {
    private int id;
    private String login;
}
