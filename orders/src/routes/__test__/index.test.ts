import request from "supertest";
import { app } from '../../app';
import { Order } from '../../models/order';
import { Ticket } from '../../models/ticket';

it('fetches orders for a particular user', async () => {
    // Create three tickets
    const ticketOne = Ticket.build({
        title: 'Concert',
        price: 20,
    });
    await ticketOne.save();

    const ticketTwo = Ticket.build({
        title: 'Play',
        price: 30,
    });
    await ticketTwo.save();

    const ticketThree = Ticket.build({
        title: 'Movie',
        price: 40,
    });
    await ticketThree.save();

    // Create one order as User #1
    const userOne = global.signin();
    await request(app)
        .post('/api/orders')
        .set('Cookie', userOne)
        .send({ ticketId: ticketOne.id })
        .expect(201);

    // Create two orders as User #2
    const userTwo = global.signin();
    
    const { body: orderOne } = await request(app)
        .post('/api/orders')
        .set('Cookie', userTwo)
        .send({ ticketId: ticketTwo.id })
        .expect(201);

    const { body: orderTwo } = await request(app)
        .post('/api/orders')
        .set('Cookie', userTwo)
        .send({ ticketId: ticketThree.id })
        .expect(201);

    // Make request to get orders for User #2
    const response = await request(app)
        .get('/api/orders')
        .set('Cookie', userTwo)
        .expect(200);

    // Expect to get back the two orders created by User #2
    expect(response.body.length).toEqual(2);
    expect(response.body[0].id).toEqual(orderOne.id);
    expect(response.body[1].id).toEqual(orderTwo.id);
});