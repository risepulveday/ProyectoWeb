package cl.musicmania.controller;

import cl.musicmania.model.Producto;
import cl.musicmania.repository.ProductoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    private final ProductoRepository productos;

    public ProductoController(ProductoRepository productos) {
        this.productos = productos;
    }

    /** GET /api/productos  o  /api/productos?categoria=equipos */
    @GetMapping
    public List<Producto> listar(@RequestParam(required = false) String categoria) {
        return (categoria == null || categoria.isBlank() || categoria.equals("todas"))
                ? productos.findAll()
                : productos.findByCategoria(categoria);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtener(@PathVariable String id) {
        return productos.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Producto> crear(@RequestBody Producto p) {
        if (p.getId() == null || p.getId().isBlank()) {
            p.setId("prod-" + System.currentTimeMillis());
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(productos.save(p));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizar(@PathVariable String id, @RequestBody Producto p) {
        if (!productos.existsById(id)) return ResponseEntity.notFound().build();
        p.setId(id);
        return ResponseEntity.ok(productos.save(p));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable String id) {
        if (!productos.existsById(id)) return ResponseEntity.notFound().build();
        productos.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
