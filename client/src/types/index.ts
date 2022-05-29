export interface SocketException {
    message: string;
}

export interface MessageData {
    name: string;
    room: string;
    message: string;
    /**
     * ISO string
     */
    date: string;
}