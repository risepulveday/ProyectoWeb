package cl.musicmania.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ordenes")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Orden {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Número visible, ej: BOL-2026-101
    @Column(unique = true)
    private String codigo;

    private LocalDateTime fecha;

    private String cliente;
    private String correo;
    private String rut;
    private String direccion;
    private String metodoPago;

    // Pendiente | En preparación | Enviado | Entregado | Cancelado
    private String estado = "Pendiente";

    private Integer total;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "orden_items", joinColumns = @JoinColumn(name = "orden_id"))
    private List<ItemOrden> productos = new ArrayList<>();
}
