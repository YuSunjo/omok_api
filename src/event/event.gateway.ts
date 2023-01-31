import {SubscribeMessage, WebSocketGateway} from '@nestjs/websockets';

@WebSocketGateway()
export class EventGateway {
    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): string {
        console.log(`${client.id} : ${payload}`);
        return 'Hello world!';
    }

    @SubscribeMessage('join')
    handleJoin(client: any, payload: any): string {
        console.log(`${client.id} : ${payload}`);
        return 'Hello world!';
    }
}
