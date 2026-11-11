package cl.musicmania.controller;

import cl.musicmania.model.Resena;
import cl.musicmania.repository.ResenaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

/** Reseñas de la comunidad (las reseñas críticas de cada álbum siguen siendo datos fijos del front). */
@RestController
@RequestMapping("/api/resenas")
public class ResenaController {

    private final ResenaRepository resenas;

    public ResenaController(ResenaRepository resenas) {
        this.resenas = resenas;
    }

    /** GET /api/resenas  o  /api/resenas?albumId=alb-1 */
    @GetMapping
    public List<Resena> listar(@RequestParam(required = false) String albumId) {
        return (albumId == null || albumId.isBlank())
                ? resenas.findAll()
                : resenas.findByAlbumIdOrderByIdDesc(albumId);
    }

    @PostMapping
    public ResponseEntity<Resena> crear(@RequestBody Resena r) {
        r.setId(null);
        r.setFecha(LocalDate.now().toString());
        if (r.getPuntuacion() == null || r.getPuntuacion() < 1 || r.getPuntuacion() > 10) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(resenas.save(r));
    }
}
