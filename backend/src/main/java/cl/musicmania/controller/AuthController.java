package cl.musicmania.controller;

import cl.musicmania.model.Usuario;
import cl.musicmania.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Pattern CORREO = Pattern.compile("^[\\w-.]+@(duoc\\.cl|profesor\\.duoc\\.cl|gmail\\.com)$", Pattern.CASE_INSENSITIVE);

    private final UsuarioRepository usuarios;
    private final PasswordEncoder encoder;

    public AuthController(UsuarioRepository usuarios, PasswordEncoder encoder) {
        this.usuarios = usuarios;
        this.encoder = encoder;
    }

    /** Body: { "correo": "...", "password": "..." } -> devuelve el usuario (sin password). */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String correo = body.getOrDefault("correo", "").trim();
        String password = body.getOrDefault("password", "").trim();

        return usuarios.findByCorreoIgnoreCase(correo)
                .filter(u -> encoder.matches(password, u.getPassword()))
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("mensaje", "Correo o contraseña incorrectos.")));
    }

    /** Registro público: siempre crea un usuario con rol Cliente. */
    @PostMapping("/registro")
    public ResponseEntity<?> registro(@RequestBody Usuario nuevo) {
        if (nuevo.getCorreo() == null || !CORREO.matcher(nuevo.getCorreo().trim()).matches()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("mensaje", "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com."));
        }
        if (nuevo.getPassword() == null || nuevo.getPassword().length() < 4 || nuevo.getPassword().length() > 10) {
            return ResponseEntity.badRequest()
                    .body(Map.of("mensaje", "La contraseña debe tener entre 4 y 10 caracteres."));
        }
        if (usuarios.existsByCorreoIgnoreCase(nuevo.getCorreo().trim())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("mensaje", "El correo ya se encuentra registrado."));
        }

        nuevo.setId(null);
        nuevo.setCorreo(nuevo.getCorreo().trim().toLowerCase());
        nuevo.setPassword(encoder.encode(nuevo.getPassword().trim()));
        nuevo.setRol("Cliente");
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarios.save(nuevo));
    }
}
