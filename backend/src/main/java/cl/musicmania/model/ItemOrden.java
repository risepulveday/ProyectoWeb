package cl.musicmania.model;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ItemOrden {
    private String productoId;
    private String nombre;
    private Integer precio;
    private Integer cantidad;
}
