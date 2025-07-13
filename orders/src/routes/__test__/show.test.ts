import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/order';
import { Ticket } from '../../models/ticket';

it('fetches a specific order for a user', async () => {
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

    // Make request to get the order for User #1
    const response = await request(app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', userOne)
        .expect(200);

    // Expect to get back the order created by User #1
    expect(response.body.id).toEqual(order.id);
    expect(response.body.ticket.id).toEqual(ticket.id);
});

it('returns an error if one user tries to fetch another user\'s order', async () => {
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

    // Try to fetch the order with User #2's credentials
    const userTwo = global.signin();
    await request(app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', userTwo)
        .expect(401);
});