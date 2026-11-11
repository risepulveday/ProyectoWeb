package cl.musicmania.config;

import cl.musicmania.model.Producto;
import cl.musicmania.model.Resena;
import cl.musicmania.model.Usuario;
import cl.musicmania.repository.ProductoRepository;
import cl.musicmania.repository.ResenaRepository;
import cl.musicmania.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

/** Carga datos iniciales solo si las tablas están vacías (equivalente a los datos base del front). */
@Component
public class DataSeeder implements CommandLineRunner {

    private final UsuarioRepository usuarios;
    private final ProductoRepository productos;
    private final ResenaRepository resenas;
    private final PasswordEncoder encoder;

    public DataSeeder(UsuarioRepository usuarios, ProductoRepository productos,
                      ResenaRepository resenas, PasswordEncoder encoder) {
        this.usuarios = usuarios;
        this.productos = productos;
        this.resenas = resenas;
        this.encoder = encoder;
    }

    @Override
    public void run(String... args) {
        if (usuarios.count() == 0) {
            usuarios.saveAll(List.of(
                    usuario("Administrador Principal", "111111111", "admin@duoc.cl", "admin", "Administrador"),
                    usuario("Administrador secundario", "222222222", "admin2@duoc.cl", "admin2", "Administrador"),
                    usuario("Cliente Ejemplo", "444444444", "cliente@gmail.com", "1234", "Cliente"),
                    usuario("Cliente Ejemplo 2", "33333333", "cliente2@gmail.com", "1234", "Cliente")
            ));
        }

        if (productos.count() == 0) {
            productos.saveAll(List.of(
                    prod("eq-1", "Amplificador de Guitarra Marshall", "Marshall", "equipos", 399990, 5, "/img/amplificadorMarshall.jpg",
                            "Amplificador de alta fidelidad, con tono cálido, distorsión clásica y potencia ideal para ensayos y estudio."),
                    prod("eq-2", "Micrófono de Condensador", "Pro Audio", "equipos", 149990, 8, "/img/microfonopro.jpg",
                            "Micrófono de estudio profesional con patrón polar cardioide, excelente claridad para voces y podcasts."),
                    prod("eq-3", "Controladora DJ Pro", "Pioneer", "equipos", 399990, 3, "/img/tornamesa.jpg",
                            "Sistema todo en uno de 2 canales, con pads retroiluminados, jog wheels de precisión y pantalla integrada."),
                    prod("eq-4", "Parlante de P.A. Profesional", "JBL", "equipos", 199990, 6, "/img/parlantejbl.jpg",
                            "Monitor de sonido de alta potencia con respuesta limpia de bajos, ideal para eventos e instalaciones en vivo."),
                    prod("eq-5", "Tornamesa Estéreo Retro", "Vintage Sound", "equipos", 99990, 10, "/img/tocadiscos.jpg",
                            "Reproductor estilo vintage con altavoces integrados, radio FM y velocidad ajustable para vinilos de 33/45 RPM."),
                    prod("eq-6", "Parlantes Monitor Audio Bronze", "Audio Bronze", "equipos", 149990, 4, "/img/parlante2.jpg",
                            "Diseño compacto de 2 vías con sonido cálido y de alta resolución para vinilos."),
                    prod("acc-1", "Limpiador de Vinilos v1", "MusicMania", "accesorios", 15990, 10, "/img/limpiadorVinilos.jpg", null),
                    prod("acc-2", "Limpiador de Vinilos Pro", "MusicMania", "accesorios", 17990, 10, "/img/Limpiavinilo2.jpg", null)
            ));
            // Vinilos (equivalente a src/data/albumesData.js)
            productos.saveAll(List.of(
                    vinilo("alb-1", "Naturaleza Muerta", "Ley 20 mil", 2011, 17990, "/img/Ley20mil.jpg",
                            "https://open.spotify.com/intl-es/track/42qpPgUmA083IZj4qD3Wzn"),
                    vinilo("alb-2", "Rap con R de Revolucion", "Portavoz", 2012, 14990, "/img/RdeRevolucion.jpg",
                            "https://open.spotify.com/intl-es/album/4XvUXpek6UQmjm5ig49yL7?highlight=spotify:track:6vmrsiaeNq7LpiGdvB2bJT"),
                    vinilo("alb-3", "El Circulo", "Kase.O", 2016, 19990, "/img/Elcirculo.jpg",
                            "https://open.spotify.com/intl-es/album/5k8yhgvK6d0hTI28zIC3NA"),
                    vinilo("alb-4", "Teatro d'ira", "Maneskin", 2017, 13990, "/img/maneskin.jpg",
                            "https://open.spotify.com/intl-es/album/7KF1Ain9mYYlg5M46g0i4A"),
                    vinilo("alb-5", "Off The Wall", "Michael Jackson", 1979, 12990, "/img/michaelJackson.webp",
                            "https://open.spotify.com/intl-es/album/2ZytN2cY4Zjrr9ukb2rqTP"),
                    vinilo("alb-6", "The Razors Edge", "AC/DC", 1990, 9990, "/img/acdc.jpg",
                            "https://open.spotify.com/intl-es/album/4vu7F6h90Br1ZtYYaqfITy"),
                    vinilo("alb-7", "YHLQMDLG", "Bad Bunny", 2020, 13990, "/img/badbunny.webp",
                            "https://open.spotify.com/intl-es/album/5lJqux7orBlA1QzyiBGti1"),
                    vinilo("alb-8", "The Dark Side Of The Moon", "Pink Floyd", 1973, 15990, "/img/pinkfloyd.png",
                            "https://open.spotify.com/intl-es/album/4LH4d3cOWNNsVw41Gqt2kv")
            ));
        }

        if (resenas.count() == 0) {
            resenas.saveAll(List.of(
                    resena("alb-1", "cliente@gmail.com", "Cliente Ejemplo", 10,
                            "¡Una obra de arte total del hip-hop chileno! Sonido crudo y letras impecables.", "2026-10-01"),
                    resena("alb-1", "cliente2@gmail.com", "Cliente Ejemplo 2", 9,
                            "Un disco imprescindible en cualquier colección de rap noventero.", "2026-10-03"),
                    resena("alb-2", "cliente@gmail.com", "Cliente Ejemplo", 10,
                            "Un manifiesto fundamental de rap con contenido político y social.", "2026-10-04")
            ));
        }
    }

    private Producto vinilo(String id, String titulo, String artista, int anio, int precio, String imagen, String spotifyUrl) {
        Producto p = prod(id, titulo, artista, "vinilos", precio, 10, imagen, null);
        p.setAnio(anio);
        p.setSpotifyUrl(spotifyUrl);
        return p;
    }

    private Resena resena(String albumId, String correo, String nombre, int puntuacion, String comentario, String fecha) {
        Resena r = new Resena();
        r.setAlbumId(albumId);
        r.setUsuarioCorreo(correo);
        r.setUsuarioNombre(nombre);
        r.setUsuarioRol("Cliente");
        r.setPuntuacion(puntuacion);
        r.setComentario(comentario);
        r.setFecha(fecha);
        return r;
    }

    private Usuario usuario(String nombre, String run, String correo, String pass, String rol) {
        Usuario u = new Usuario();
        u.setNombre(nombre);
        u.setRun(run);
        u.setCorreo(correo);
        u.setPassword(encoder.encode(pass));
        u.setRol(rol);
        return u;
    }

    private Producto prod(String id, String titulo, String artista, String categoria, int precio, int stock, String imagen, String desc) {
        return new Producto(id, titulo, artista, categoria, precio, stock, imagen, desc, null, null);
    }
}
