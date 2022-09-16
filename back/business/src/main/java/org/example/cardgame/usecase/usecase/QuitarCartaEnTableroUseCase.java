package org.example.cardgame.usecase.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.domain.Juego;
import org.example.cardgame.domain.command.QuitarCartaEnTablero;
import org.example.cardgame.domain.values.Carta;
import org.example.cardgame.domain.values.JuegoId;
import org.example.cardgame.domain.values.JugadorId;
import org.example.cardgame.usecase.gateway.JuegoDomainEventRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.HashSet;
import java.util.Set;

public class QuitarCartaEnTableroUseCase extends UseCaseForCommand<QuitarCartaEnTablero> {
    private final JuegoDomainEventRepository repository;

    public QuitarCartaEnTableroUseCase(JuegoDomainEventRepository repository) {
        this.repository = repository;
    }

    @Override
    public Flux<DomainEvent> apply(Mono<QuitarCartaEnTablero> quitarCartaEnTablero) {
        return quitarCartaEnTablero.flatMapMany((command) -> repository
                .obtenerEventosPor(command.getJuegoId())
                .collectList()
                .flatMapIterable(events -> {
                    var juego = Juego.from(JuegoId.of(command.getJuegoId()), events);
                    var tableroId = juego.tablero().identity();
                    var jugadorId = JugadorId.of(command.getJugadorId());
                    Set<Carta> cartasEnTablero = new HashSet<>();
                    juego.tablero().partida().forEach((jugador, cartas) -> {
                        cartas.stream()
                                .map(carta ->  cartasEnTablero.add(carta));
                    });
                    var cartaSeleccionada = seleccionarCarta(command.getCartaId(), cartasEnTablero);

                    juego.tablero().quitarCarta(jugadorId,cartaSeleccionada);
                    juego.quitarCartaEnTablero(tableroId, jugadorId, cartaSeleccionada);
                    return juego.getUncommittedChanges();
                }));
    }

    private Carta seleccionarCarta(String cartaId, java.util.Set<Carta> cartasDelJugador) {
        return cartasDelJugador
                .stream()
                .filter(c -> c.value().cartaId().value().equals(cartaId))
                .findFirst()
                .orElseThrow();
    }
}