export interface Message{
       id: number;
      senderid: number;
        senderusername: string;
        senderPhotoUrl: string;
        recipientid: number;
        recipientusername: string;
        recipientPhotoUrl: string;
        content: string;
        dateread?: Date;
        messagesent: Date;
}