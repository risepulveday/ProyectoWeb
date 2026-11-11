package cl.musicmania.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "productos")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Producto {

    // String para mantener ids del front: "alb-1", "eq-1", "acc-1", "prod-123..."
    @Id
    private String id;

    private String titulo;
    private String artista;

    // vinilos | equipos | accesorios
    private String categoria = "vinilos";

    private Integer precio;
    private Integer stock = 5;
    private String imagen;

    @Column(length = 1000)
    private String descripcion;

    // Solo vinilos
    private Integer anio;

    @Column(length = 500)
    private String spotifyUrl;
}
