package org.cdwbackend.dto;

import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.entity.database.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class CustomUserSecurity implements UserDetails {
    Long id;
    String email;
    transient String password;
    transient Collection<? extends GrantedAuthority> authorities;
    boolean isActive;

    public CustomUserSecurity(User user, List<GrantedAuthority> authority) {
        this.id = user.getId();
        this.password = user.getPassword();
        this.isActive = !user.getIsDeleted();
        this.email = user.getEmail();
        this.authorities = authority;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Customize based on your logic
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Customize based on your logic
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Customize based on your logic
    }

    @Override
    public boolean isEnabled() {
        return isActive;
    }

}
