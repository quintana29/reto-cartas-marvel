package org.example.cardgame.usecase.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.domain.command.IniciarRondaCommand;
import org.example.cardgame.domain.events.RondaCreada;
import org.example.cardgame.domain.events.RondaIniciada;
import org.example.cardgame.domain.events.TableroCreado;
import org.example.cardgame.domain.values.JugadorId;
import org.example.cardgame.domain.values.Ronda;
import org.example.cardgame.domain.values.TableroId;
import org.example.cardgame.usecase.gateway.JuegoDomainEventRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.Set;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class IniciarRondaUseCaseTest {

    @Mock
    private JuegoDomainEventRepository repository;

    @InjectMocks
    private IniciarRondaUseCase useCase;

    @Test
    void iniciarRondaTest(){
        var command = new IniciarRondaCommand();
        command.setJuegoId("AAA");

        when(repository.obtenerEventosPor("AAA")).thenReturn(history());

        StepVerifier.create(useCase.apply(Mono.just(command)))
                .expectNextMatches( domainEvent -> {
                    var event = (RondaIniciada) domainEvent;
                    return "AAA".equals(event.aggregateRootId());
                }).expectComplete()
                .verify();
    }

    private Flux<DomainEvent> history() {
        return Flux.just(
                new TableroCreado( TableroId.of("111"),
                        Set.of(JugadorId.of("333"),JugadorId.of("222"))
                ),
                new RondaCreada(
                        new Ronda(1,
                                Set.of(JugadorId.of("222"),
                                        JugadorId.of("123"))),30)
        );

    }
}