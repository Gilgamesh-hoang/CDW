package org.cdwbackend.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.cdwbackend.dto.UserDTO;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse implements Serializable {
    private String accessToken;
    @JsonIgnore
    private transient String refreshToken;
    private UserDTO user;
}
