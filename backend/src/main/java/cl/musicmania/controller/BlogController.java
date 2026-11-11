package cl.musicmania.controller;

import cl.musicmania.model.Blog;
import cl.musicmania.repository.BlogRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    private final BlogRepository blogs;

    public BlogController(BlogRepository blogs) {
        this.blogs = blogs;
    }

    @GetMapping
    public List<Blog> listar() {
        return blogs.findAllByOrderByCreadoDesc();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> obtener(@PathVariable String id) {
        return blogs.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Blog> crear(@RequestBody Blog b) {
        b.setId("blog-" + System.currentTimeMillis());
        b.setCreado(System.currentTimeMillis());
        b.setFecha(LocalDate.now().format(DateTimeFormatter.ofPattern("dd 'de' MMMM, yyyy", new Locale("es", "CL"))));
        return ResponseEntity.status(HttpStatus.CREATED).body(blogs.save(b));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable String id) {
        if (!blogs.existsById(id)) return ResponseEntity.notFound().build();
        blogs.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
