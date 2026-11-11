package cl.musicmania.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "blogs")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Blog {

    @Id
    private String id;

    private String title;
    private String subtitle;
    private String fecha;
    private String autor = "Redacción MusicMania";

    @Column(length = 1000)
    private String summary;

    private String image;

    // Para ordenar (más nuevo primero)
    private Long creado;

    // Párrafos separados por línea en blanco
    @Column(columnDefinition = "TEXT")
    private String contenidoExtendido;
}
