export class Room {
    private id: number;
    private password: string;
    private hostNick: string;
    private guestNick: string;
    private isPassword: boolean;

    public get Id(): number {
        return this.id;
    }

    public get Password(): string {
        return this.password;
    }

    public get HostNick(): string {
        return this.hostNick;
    }

    public get GuestNick(): string {
        return this.guestNick;
    }

    public set Id(value: number) {
        this.id = value;
    }

    public set Password(value: string) {
        this.password = value;
        if(value.length > 0){
            this.isPassword = true;
        } else {
            this.isPassword = false;
        }
    }

    public set HostNick(value: string) {
        this.hostNick = value;
    }

    public set GuestNick(value: string) {
        this.guestNick = value;
    }

    public get IsPassword(): boolean {
        return this.isPassword;
    }

    public set IsPassword(value: boolean) {
        this.isPassword = value;
    }
}