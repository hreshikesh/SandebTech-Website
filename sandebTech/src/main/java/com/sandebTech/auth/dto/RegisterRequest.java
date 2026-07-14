package com.sandebTech.auth.dto;



import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    @NotBlank(message = "Full name is required.")
    @Size(min = 2, max = 20, message = "Name must be between 2 and 20 characters.")
    @Pattern(
            regexp = "^[a-zA-Z\\s]*$",
            message = "Name can only contain letters and spaces."
    )
    private String name;

    @NotBlank(message = "Email address is required.")
    @Email(message = "Enter a valid email address.")
    @Size(max = 254, message = "Email is too long.")
    private String email;

    @NotBlank(message = "Phone number is required.")
    @Pattern(
            regexp = "^\\+?[1-9]\\d{1,14}$",
            message = "Enter a valid phone number."
    )
    private String phone;

    @Size(max = 40, message = "Company name cannot exceed 40 characters.")
    @Pattern(
            regexp = "^[a-zA-Z0-9\\s&.,-]*$",
            message = "Company contains invalid characters."
    )
    private String company;
}
