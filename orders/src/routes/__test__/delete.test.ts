import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { Order, OrderStatus } from '../../models/order';
import { natsWrapper } from '../../nats-wrapper';

it('marks an order as cancelled', async () => {
    // Create a ticket
    const ticket = Ticket.build({
        title: 'Concert',
        price: 20,
    });
    await ticket.save();

    // Create an order as User #1
    const userOne = global.signin();
    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', userOne)
        .send({ ticketId: ticket.id })
        .expect(201);

    // Make request to cancel the order
    await request(app)
        .delete(`/api/orders/${order.id}`)
        .set('Cookie', userOne)
        .expect(204);

    // Expect the order to be cancelled
    const updatedOrder = await Order.findById(order.id);
    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('emits an order cancelled event', async () => {
    // Create a ticket
    const ticket = Ticket.build({
        title: 'Concert',
        price: 20,
    });
    await ticket.save();

    // Create an order as User #1
    const userOne = global.signin();
    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', userOne)
        .send({ ticketId: ticket.id })
        .expect(201);

    // Make request to cancel the order
    await request(app)
        .delete(`/api/orders/${order.id}`)
        .set('Cookie', userOne)
        .expect(204);

    // Expect an event to be published
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});