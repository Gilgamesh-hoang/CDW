package org.cdwbackend.util;

import lombok.experimental.UtilityClass;
import org.cdwbackend.dto.CustomUserSecurity;
import org.springframework.security.core.context.SecurityContextHolder;

@UtilityClass
public class UserSecurityHelper {

    public CustomUserSecurity getCurrentUser() {
        return (CustomUserSecurity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
