package cl.musicmania.controller;

import cl.musicmania.model.Categoria;
import cl.musicmania.repository.CategoriaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    private final CategoriaRepository categorias;

    public CategoriaController(CategoriaRepository categorias) {
        this.categorias = categorias;
    }

    @GetMapping
    public List<Categoria> listar() {
        return categorias.findAll();
    }

    @PostMapping
    public ResponseEntity<Categoria> crear(@RequestBody Categoria c) {
        c.setId("cat-" + System.currentTimeMillis());
        c.setCantidad(0);
        if (c.getDescripcion() == null || c.getDescripcion().isBlank()) {
            c.setDescripcion("Categoría del catálogo oficial de MusicMania.");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(categorias.save(c));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable String id) {
        if (!categorias.existsById(id)) return ResponseEntity.notFound().build();
        categorias.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
