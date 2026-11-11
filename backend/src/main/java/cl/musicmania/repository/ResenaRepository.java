package cl.musicmania.repository;

import cl.musicmania.model.Resena;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResenaRepository extends JpaRepository<Resena, Long> {
    List<Resena> findByAlbumIdOrderByIdDesc(String albumId);
}
