package cl.musicmania.repository;

import cl.musicmania.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, String> {
    List<Blog> findAllByOrderByCreadoDesc();
}
