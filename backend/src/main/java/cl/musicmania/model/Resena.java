package cl.musicmania.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "resenas")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Resena {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Id del álbum de reseñas: "alb-1", "alb-2"...
    private String albumId;

    private String usuarioCorreo;
    private String usuarioNombre;
    private String usuarioRol;

    private Integer puntuacion;

    @Column(length = 1000)
    private String comentario;

    private String fecha;
}
