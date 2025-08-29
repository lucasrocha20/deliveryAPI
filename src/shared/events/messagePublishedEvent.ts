export class MessagePublishedEvent {
  constructor(
    public readonly messageId: string,
    public readonly content: string,
  ) {}
}