export interface JoinRoomParams {
    room: string;
}

export interface SendMessageParams {
    name: string;
    room: string;
    message: string;
    /**
     * ISO string
     */
    date: string;
}
