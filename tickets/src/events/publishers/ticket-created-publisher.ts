import {Publisher, Subjects, TicketCreatedEvent} from '@dlticketeer/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}