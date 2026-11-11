package cl.musicmania.controller;

import cl.musicmania.model.Usuario;
import cl.musicmania.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/** CRUD de usuarios para el panel de administración. */
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private static final String ADMIN_PRINCIPAL = "admin@duoc.cl";

    private final UsuarioRepository usuarios;
    private final PasswordEncoder encoder;

    public UsuarioController(UsuarioRepository usuarios, PasswordEncoder encoder) {
        this.usuarios = usuarios;
        this.encoder = encoder;
    }

    @GetMapping
    public List<Usuario> listar() {
        return usuarios.findAll();
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Usuario u) {
        if (u.getNombre() == null || u.getNombre().isBlank()
                || u.getCorreo() == null || u.getCorreo().isBlank()
                || u.getPassword() == null || u.getPassword().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("mensaje", "Completa los campos obligatorios."));
        }
        if (usuarios.existsByCorreoIgnoreCase(u.getCorreo().trim())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("mensaje", "El correo ingresado ya se encuentra registrado."));
        }
        u.setId(null);
        u.setCorreo(u.getCorreo().trim().toLowerCase());
        u.setPassword(encoder.encode(u.getPassword().trim()));
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarios.save(u));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody Usuario datos) {
        return usuarios.findById(id).<ResponseEntity<?>>map(u -> {
            u.setNombre(datos.getNombre());
            u.setRun(datos.getRun());
            u.setCorreo(datos.getCorreo().trim().toLowerCase());
            u.setRol(datos.getRol());
            // Contraseña en blanco = no cambia
            if (datos.getPassword() != null && !datos.getPassword().isBlank()) {
                u.setPassword(encoder.encode(datos.getPassword().trim()));
            }
            return ResponseEntity.ok(usuarios.save(u));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        return usuarios.findById(id).<ResponseEntity<?>>map(u -> {
            if (ADMIN_PRINCIPAL.equalsIgnoreCase(u.getCorreo())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("mensaje", "No se puede eliminar la cuenta del Administrador Principal."));
            }
            usuarios.delete(u);
            return ResponseEntity.noContent().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
