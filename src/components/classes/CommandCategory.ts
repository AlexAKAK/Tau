export default class CommandCategory {
    public commands: any[]
    public name: string
    public description: string
    public addCommand(command: any) {
        this.commands.push(command)
    }

    constructor(name: string, commands: any[], description: string) {
        this.commands = commands
        this.name = name
        this.description = description
    }
}