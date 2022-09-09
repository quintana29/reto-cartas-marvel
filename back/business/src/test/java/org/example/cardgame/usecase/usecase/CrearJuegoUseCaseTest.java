package org.example.cardgame.usecase.usecase;

import org.example.cardgame.domain.command.CrearJuegoCommand;
import org.example.cardgame.domain.events.JuegoCreado;
import org.example.cardgame.domain.events.JugadorAgregado;
import org.example.cardgame.usecase.gateway.ListaDeCartaService;
import org.example.cardgame.usecase.gateway.model.CartaMaestra;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.HashMap;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CrearJuegoUseCaseTest {

    @Mock
    private ListaDeCartaService listaDeCartaService;

    @InjectMocks
    private CrearJuegoUseCase useCase;

    @Test
    void crearJuego(){
        var command = new CrearJuegoCommand();

        command.setJuegoId("AAAA");
        command.setJugadores(new HashMap<>());
        command.getJugadores().put("XXX", "Juan");
        command.getJugadores().put("DDD", "Cristian");

        command.setJugadorPrincipalId("XXX");

        when(listaDeCartaService.obtenerCartasDeMarvel()).thenReturn(history());

        StepVerifier.create(useCase.apply(Mono.just(command)))
                .expectNextMatches(
                        domainEvent -> {
                            var event = (JuegoCreado) domainEvent;
                            return  event.getJugadorPrincipal().value().equals("XXX") && event.aggregateRootId().equals("AAAA");
                        }
                )
                .expectNextMatches(
                        domainEvent -> {
                            var event = (JugadorAgregado) domainEvent;
                            Assertions.assertEquals(5, event.getMazo().value().cantidad());
                            return "DDD".equals(event.getJugadorId().value()) && "Cristian".equals(event.getAlias());
                        }
                )
                .expectNextMatches(
                        domainEvent -> {
                            var event = (JugadorAgregado) domainEvent;
                            Assertions.assertEquals(5, event.getMazo().value().cantidad());
                            return "XXX".equals(event.getJugadorId().value()) && "Juan".equals(event.getAlias());
                        }
                )
                .expectComplete()
                .verify();

    }

    private Flux<CartaMaestra> history() {

        return Flux.just(
                new CartaMaestra("1", "Thor"),
                new CartaMaestra("2", "Hulk1"),
                new CartaMaestra("3", "Hulk2"),
                new CartaMaestra("4", "Hulk3"),
                new CartaMaestra("5", "Hulk4"),
                new CartaMaestra("6", "Hulk5"),
                new CartaMaestra("7", "Hulk6"),
                new CartaMaestra("8", "Hulk7"),
                new CartaMaestra("9", "Hulk8"),
                new CartaMaestra("10", "Hulk9"),
                new CartaMaestra("11", "Hulk10"),
                new CartaMaestra("12", "Hulk11")

        );
    }

}