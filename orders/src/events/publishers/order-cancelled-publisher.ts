import {Publisher, OrderCancelledEvent, Subjects} from '@dlticketeer/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
