package cl.musicmania.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "usuarios")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String run;
    private String nombre;

    @Column(unique = true, nullable = false)
    private String correo;

    // Nunca se devuelve al front; solo se acepta al recibir datos
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    // "Cliente" o "Administrador"
    private String rol = "Cliente";

    private String region;
    private String comuna;
    private String direccion;
}
