export const natsWrapper = {
    client:{
        publish: jest.fn().mockImplementation((subject: string, data: string, callback: () => void) => {
            console.log(`Mock publish to subject ${subject} with data: ${data}`);
            callback();
        }),
    }
};