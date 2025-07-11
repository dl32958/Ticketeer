import {Publisher, Subjects, TicketUpdatedEvent} from '@dlticketeer/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}