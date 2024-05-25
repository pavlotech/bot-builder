export default {
  commands: [
    {
      command: 'start',
      description: 'Start the bot and see the welcome message',
    },
    {
      command: 'translate',
      description: 'Translate text into a different language',
    }
  ],
  stage: {
    ttl: 10 * 60 * 1000
  }
}