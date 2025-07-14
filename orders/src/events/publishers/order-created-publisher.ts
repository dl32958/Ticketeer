import {Publisher, OrderCreatedEvent, Subjects} from '@dlticketeer/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
