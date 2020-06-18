package com.webapp.movieswebapp.User;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.Email;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@JsonIgnoreProperties({"hibernateLazyInitializer","handler","enabled"})
public @Data class SiteUser {
    @NonNull
    @Email
    @Id
    private String email;
    @NonNull
    @Length(min=6)
    private String Password;
    private boolean enabled = true;
    private String authorities = "USER";
    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }
}
