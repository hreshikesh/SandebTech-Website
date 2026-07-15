package com.sandebTech.contact.dto;


import com.sandebTech.contact.entity.ContactStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateContactStatusRequest {

    @NotNull
    private ContactStatus status;

}