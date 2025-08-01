import mongoose from "mongoose";

interface TicketAttrs {
    title: string;
    price: number;
    userId: string;
};

interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
    userId: string;
};

interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc;
};

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    userId: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        // ret is object to be turned into JSON
        transform(doc, ret:any) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});


ticketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket(attrs);
};
const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };