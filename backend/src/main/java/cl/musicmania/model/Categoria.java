package cl.musicmania.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "categorias")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Categoria {

    @Id
    private String id;

    private String nombre;

    @Column(length = 500)
    private String descripcion;

    private Integer cantidad = 0;
}
