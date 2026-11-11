package cl.musicmania.controller;

import cl.musicmania.model.ItemOrden;
import cl.musicmania.model.Orden;
import cl.musicmania.repository.OrdenRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ordenes")
public class OrdenController {

    private final OrdenRepository ordenes;

    public OrdenController(OrdenRepository ordenes) {
        this.ordenes = ordenes;
    }

    /** GET /api/ordenes  o  /api/ordenes?correo=cliente@gmail.com (historial de un cliente) */
    @GetMapping
    public List<Orden> listar(@RequestParam(required = false) String correo) {
        return (correo == null || correo.isBlank())
                ? ordenes.findAllByOrderByFechaDesc()
                : ordenes.findByCorreoIgnoreCaseOrderByFechaDesc(correo);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Orden> obtener(@PathVariable Long id) {
        return ordenes.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    /** Crea la orden y calcula el total en el servidor a partir de los ítems. */
    @PostMapping
    public ResponseEntity<Orden> crear(@RequestBody Orden o) {
        o.setId(null);
        o.setFecha(LocalDateTime.now());
        o.setEstado("Pendiente");
        int total = 0;
        for (ItemOrden it : o.getProductos()) {
            total += (it.getPrecio() == null ? 0 : it.getPrecio()) * (it.getCantidad() == null ? 1 : it.getCantidad());
        }
        o.setTotal(total);
        o.setCodigo("BOL-" + LocalDateTime.now().getYear() + "-" + (System.currentTimeMillis() % 1_000_000));
        return ResponseEntity.status(HttpStatus.CREATED).body(ordenes.save(o));
    }

    /** Body: { "estado": "Enviado" } */
    @PutMapping("/{id}/estado")
    public ResponseEntity<Orden> cambiarEstado(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return ordenes.findById(id).map(o -> {
            o.setEstado(body.get("estado"));
            return ResponseEntity.ok(ordenes.save(o));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!ordenes.existsById(id)) return ResponseEntity.notFound().build();
        ordenes.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
