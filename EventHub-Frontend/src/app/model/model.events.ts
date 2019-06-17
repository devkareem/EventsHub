export class EventClass{
    title: String;
    description: String;
    startTime: Date;
    endTime: Date;
    user: {
        name: String,
    }
    invaitedUsers: [{
        name: String,
    }];
    comment:string;
}
