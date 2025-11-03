package com.TheCoderKushagra.dto;

import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ViewerRequest {
    private String userName;
    private String email;
    private String password;
}
